import formidable from 'formidable';
import cloudinary from 'cloudinary';
import Content from '../models/Content.model.mjs';
import Course from '../models/Course.model.mjs';
import User, {safeUserCredential} from '../models/User.model.mjs';
import { UtilsUser as UtilsUser } from '../utils/user.mjs';

// TODO: handle the accessType and also check cr's branch so that cr can't update other branch's data
// TODO: handle other branch's user can't enroll etc

// add-newCourse
export const addCourse = async (req, res) => {
  try {
    const { courseName, courseCode, courseInstructor, semester, branches, description } = req.body;

    if (!courseName || !courseCode || !semester || !branches || !description) {
      return res.status(400).json({ error: 'Course details is required' });
    }
    // courseCode = courseCode.replace(/\s+/g, '').toUpperCase();
    const existingCourse = await Course.findOne({ courseCode });
    if (existingCourse) {
      return res.status(400).json({ error: 'Course already exists' });
    }

    const newCourse = new Course({
      courseName,
      courseCode,
      courseInstructor,
      semester,
      description,
      branch: branches,
      notes: [],
    });

    await newCourse.save();

    return res.status(201).json({
      success: true,
      course: newCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Failed to add course. Please try again.',
    });
  }
};
export const updateCourse = async (req, res) => {
  try {
    const { courseId, courseName, courseCode, courseInstructor, semester, branches, description } = req.body;

    if (!courseName || !courseCode || !semester || !branches || !description) {
      return res.status(400).json({ error: 'Course details is required' });
    }
    // courseCode = courseCode.replace(/\s+/g, '').toUpperCase();
    const updatedCourse = await Course.findByIdAndUpdate(courseId,
      { courseName,
        courseCode,
        courseInstructor,
        semester,
        description,
        branch: branches 
      },
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    return res.status(201).json({
      success: true,
      course: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Failed to Update course. Please try again.',
    });
  }
}

//upload-notes
export const upload = async (req, res) => {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing the file' });
    }
    const user = req.user;
    const uploadedFile = files.file ? files.file[0] : null;

    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const isImage = uploadedFile.mimetype.startsWith('image/');

      const result = isImage
        ? await cloudinary.v2.uploader.upload(uploadedFile.filepath, {
          resource_type: 'image',
          public_id: `uploads/${uploadedFile.originalFilename}`,
        })
        : await cloudinary.v2.uploader.upload(uploadedFile.filepath, {
          resource_type: 'raw',
          public_id: `uploads/${uploadedFile.originalFilename}`,
        });

      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
      const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
      const accessType = Array.isArray(fields.accessType) ? fields.accessType[0] : fields.accessType;
      const courseName = Array.isArray(fields.course) ? fields.course[0] : fields.course;

      const tagArray = Array.isArray(fields.tags) ? fields.tags : (fields.tags ? fields.tags.split(',') : []);

      const newContent = new Content({
        title,
        description,
        tags: tagArray,
        accessType,
        fileUrl: result.secure_url,
        fileName: uploadedFile.originalFilename,
        uploadBy: user._id,
        course: null,
      });

      await newContent.save();

      user.uploadedNotes.push(newContent._id);
      await user.save();

      let course = await Course.findOne({ courseName });

      if (!course) {
        course = new Course({
          courseName,
          notes: [newContent._id],
        });
        await course.save();
      } else {
        course.notes.push(newContent._id);
        await course.save();
      }

      newContent.course = course._id;
      await newContent.save();

      return res.status(200).json({
        message: 'File uploaded successfully and content saved!',
        fileUrl: result.secure_url,
        content: newContent,
      });
    } catch (uploadErr) {
      console.log(uploadErr);
      return res.status(500).json({ error: `Failed to upload file to Cloudinary ${uploadErr.message}` });
    }
  });
};

//get-notes-byId
export const getNoteById = async (req, res) => {
  try {
    // TODO: // check is enrolled
    const { courseId, id } = req.params;

    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    // const course = await Course.findById(courseId).populate('notes');
    // if (!course) return res.status(404).json({ error: 'Course not found' });
    if (!user.enrolledCourses.includes(courseId)){
      return res.status(403).json({ error: 'Please Enroll to the course first' });
    }

    const note = await Content.findById(id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    
    return res.status(200).json({ note });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//get-course-byId
export const getCourse = async (req, res) => {
  try {
    
    const courseId = req.params.id;
    
    const course = await Course.findById(courseId).populate({
                                                              path: 'notes',
                                                              populate: {
                                                                path: 'uploadBy',  // The field to populate
                                                                model: 'User',      // The model to use for the populate
                                                                select: 'name semester branch role'      // Only select the 'name' field
                                                              }
                                                            });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ error: 'courseId is required' });
    }
    const user = req.user;
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // const utilsUser = new UtilsUser(user.email);
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    if (!(user.semester == course.semester && (course.branch.includes(user.branch) || course.branch.length === 0))) {
      return res.status(403).json({ error: "you can't enroll in this course" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { enrolledCourses: [...user.enrolledCourses, course] },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ success: true, user: safeUserCredential(updatedUser) });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
export const unenrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ error: 'courseId is required' });
    }
    const user = req.user;
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const utilsUser = new UtilsUser(user.email);
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { enrolledCourses: [...user.enrolledCourses.filter((enrolledCourse) => enrolledCourse._id != courseId)] },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ success: true, user: safeUserCredential(updatedUser) });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}


//get-allCourses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses || courses.length === 0) {
      return res.status(404).json({ error: 'No courses found' });
    }
    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//delete-course
export const deleteCourse = async (req, res) => {
  const { id } = req.params; 
  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({
        error: 'Course not found.',
      });
    }
    return res.status(200).json({
      message: 'Course deleted successfully.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Failed to delete course. Please try again.',
    });
  }
};

//delte-notes
export const deleteNotes = async (req, res) => {
  const { id } = req.params; 
  try {
    const content = await Content.findById(id);

    if (!content) {
      return res.status(404).json({
        error: 'Note not found.',
      });
    }

    const courseId = content.course;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        error: 'Course not found.',
      });
    }

    course.notes = course.notes.filter(noteId => noteId.toString() !== id);

    await course.save();

    await Content.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Note deleted successfully, course updated.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Failed to delete note or update course. Please try again.',
    });
  }
};

