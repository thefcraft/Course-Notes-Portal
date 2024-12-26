import React, { useState, FormEvent } from 'react';
import { BookOpen, Code, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_URL } from '@/lib/constants';

const AddCourse = ({ closePopup }: { closePopup: () => void }) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [semester, setSemester] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!courseName || !courseCode || !semester) {
      alert("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (isNaN(Number(semester))) {
      alert("Semester should be a number");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/content/add-course`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseName, courseCode, semester }),
        credentials:'include'
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Course added successfully!");
        closePopup();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("Something went wrong while adding the course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-xl mx-auto bg-white dark:bg-zinc-950 dark:bg-opacity-90 mt-4 shadow-md dark:shadow-xl rounded-lg p-6">
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
            type="number"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            placeholder="Enter the Semester"
            className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded dark:bg-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full flex items-center justify-center py-2 px-4 rounded ${
            loading
              ? 'bg-blue-400 dark:bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
          } text-white focus:outline-none`}
          disabled={loading}
        >
          <Check className="mr-2" />
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
