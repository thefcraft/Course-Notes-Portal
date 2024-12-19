import React, { useState, FormEvent } from 'react';
import { BookOpen, Code, Check, X } from 'lucide-react';

const AddCourse = ({ closePopup }: { closePopup: () => void }) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [semester, setSemester] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (!courseName || !courseCode) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/content/add-course", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseName, courseCode,semester }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Course added successfully!");
        closePopup(); // Close the popup on success
        console.log(data); // Handle success, possibly navigate or reset form
      } else {
        alert("Failed to add course: " + data.error);
      }
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Something went wrong while adding the course.");
    }
  };

  return (
    <div className="relative max-w-xl mx-auto bg-white dark:bg-zinc-950 dark:bg-opacity-90 mt-4 shadow-md dark:shadow-xl rounded-lg p-6">
      {/* Close Icon */}
      <button
        onClick={closePopup}
        className="absolute top-3 right-3 p-2 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 focus:outline-none"
      >
        <X className="w-5 h-5" />
      </button>

      <h2 className="text-2xl font-semibold mb-4 flex items-center text-blue-600 dark:text-blue-400">
        <BookOpen className="mr-2" />
        Add New Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Name */}
        <div>
          <label className="mb-2 flex items-center text-zinc-600 dark:text-zinc-300">
            <BookOpen className="mr-2" />
            Course Name
          </label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name"
            className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded dark:bg-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Course Code */}
        <div>
          <label className="mb-2 flex items-center text-zinc-600 dark:text-zinc-300">
            <Code className="mr-2" />
            Course Code
          </label>
          <input
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            placeholder="Enter course code"
            className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded dark:bg-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="mb-2 flex items-center text-zinc-600 dark:text-zinc-300">
            <Code className="mr-2" />
            Semester
          </label>
          <input
            type="Number"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            placeholder="Enter course code"
            className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded dark:bg-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none"
        >
          <Check className="mr-2" />
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
