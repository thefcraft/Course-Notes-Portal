import  { useState } from 'react';
import axios from 'axios';
import { Trash, X } from 'lucide-react';  
import toast from 'react-hot-toast';
import { API_URL } from '@/lib/constants';
import { Course } from '@/lib/types';
import AskConfirmation from '@/components/ask-confirmation';

interface DeleteCourseProps{
  closePopup: () => void;
  courses: Course[];
}
const DeleteCourse = ({ closePopup, courses }: DeleteCourseProps) => {
  const [deletePop, setDeletePop] = useState(false);  // Control visibility of delete popup
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);  // Track course to delete
  const [error, setError] = useState<string | null>(null);


  const handleDelete = (courseId: string) => {
    setCourseToDelete(courseId);
    setDeletePop(true); 
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/content/delete-course/${courseToDelete}`);
      toast.success("Course deleted successfully");
      setDeletePop(false);
      closePopup();
      setCourseToDelete(null);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Failed to delete course. Please try again later.";
      toast.error(errorMessage);
    }
  };

  const cancelDelete = () => {
    setDeletePop(false);  
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-950 dark:bg-opacity-90 shadow-lg rounded-lg p-6 pt-4">
      <div className=" flex  justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Courses</h2>
        <button
          onClick={closePopup}
          className=" text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {error && <div className="text-red-500 text-xl text-center mt-8">{error}</div>}

      <ul className="space-y-4">
        {courses.map((course) => (
          <li key={course._id} className="flex justify-between items-center bg-gray-100 dark:bg-zinc-800 rounded-lg p-4">
            <span className="text-lg text-gray-700 dark:text-gray-200">{course.courseName}</span>
            <button
              onClick={() => handleDelete(course._id)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <Trash className="h-5 w-5" />
            </button>
          </li>
        ))}
        {courses.length === 0 && <div className='text-center py-3 bg-gray-50 dark:bg-zinc-900'>Add Course First</div>}
      </ul>

      {deletePop && <AskConfirmation variant='destructive'
        title="Confirm Deletion"
        description="Are you sure you want to delete this course? This action cannot be undone."
        onClickCancel={cancelDelete} onClickConfirm={confirmDelete}/>}

    </div>
  );
};

export default DeleteCourse;
