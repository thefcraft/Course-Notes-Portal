import  { useState } from 'react';
import axios from 'axios';
import { Trash, X } from 'lucide-react';  
import toast from 'react-hot-toast';
import { API_URL } from '@/lib/constants';
import { Course } from '@/lib/types';

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
      </ul>

      {deletePop && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-95 z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg w-full max-w-md">
            <h3 className="text-xl text-center font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this course? This action cannot be undone.
            </p>
            <div className="flex justify-between">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteCourse;
