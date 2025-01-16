import React, { useState, FormEvent } from 'react';
import { BookOpen, Code, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_URL } from '@/lib/constants';
import { Branch } from '@/lib/types';
import MultipleSelector, { Option as OptionBase } from '@/components/ui/multiple-selector';

interface Option extends OptionBase {
  value: Branch;
  label: Branch;
}

const OPTIONS: Option[] = [
  { label: 'AI', value: 'AI' },
  { label: 'CB', value: 'CB' },
  { label: 'CE', value: 'CE' },
  { label: 'CH', value: 'CH' },
  { label: 'CM', value: 'CM' },
  { label: 'CS', value: 'CS' },
  { label: 'CT', value: 'CT' },
  { label: 'EC', value: 'EC' },
  { label: 'EE', value: 'EE' },
  { label: 'ES', value: 'ES' },
  { label: 'GT', value: 'GT' },
  { label: 'HS', value: 'HS' },
  { label: 'MA', value: 'MA' },
  { label: 'MC', value: 'MC' },
  { label: 'ME', value: 'ME' },
  { label: 'MM', value: 'MM' },
  { label: 'MT', value: 'MT' },
  { label: 'PC', value: 'PC' },
  { label: 'PH', value: 'PH' },
  { label: 'PR', value: 'PR' },
  { label: 'ST', value: 'ST' },
  { label: 'VL', value: 'VL' }
];

interface AddCourseProps{ 
  closePopup: () => void, 
  setIsEmpty: React.Dispatch<React.SetStateAction<boolean>> ,
  defaultCourseName?: string,
  defaultCourseCode?: string,
  defaultCourseInstructor?: string,
  defaultSemester?: string,
  defaultDescription?: string,
  defaultBranches?: Branch[],
  defaultCourseId?: string
}
const AddCourse = ({ closePopup, setIsEmpty, defaultCourseId, defaultCourseName, defaultBranches, defaultCourseCode, defaultCourseInstructor, defaultDescription, defaultSemester }: AddCourseProps) => {
  const [courseName, setCourseName] = useState<string>(defaultCourseName || '');
  const [courseCode, setCourseCode] = useState<string>(defaultCourseCode || '');
  const [courseInstructor, setCourseInstructor] = useState<string>( defaultCourseInstructor || '');
  const [semester, setSemester] = useState<string>(defaultSemester || '');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(defaultDescription || '');
  const [branches, setBranches] = useState<OptionBase[]>(defaultBranches?
                                                          defaultBranches.map((branch: Branch): Option => ({ label: branch, value: branch }))
                                                          :
                                                          []);

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

    if (Number(semester) > 10 || Number(semester) < 1) {
      alert("Semester should be between 1 to 10");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${API_URL}/content/add-course`, {
        method: (defaultCourseId === undefined)?"POST":"PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          courseName, courseCode, courseInstructor, semester, description, branches: branches.map((branch) => branch.value) ,
          courseId: defaultCourseId
        }),
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
    <div className="relative max-w-2xl mx-auto bg-white dark:bg-zinc-950 dark:bg-opacity-95 shadow-md dark:shadow-xl rounded-lg py-6">
      <button
        onClick={closePopup}
        className="absolute top-3 right-3 p-2 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 focus:outline-none"
      >
        <X className="w-5 h-5" />
      </button>

      <h2 className="text-2xl font-semibold mb-4 flex items-center text-blue-600 dark:text-blue-400 px-6">
        <BookOpen className="mr-2" />
        Add New Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-6 scrollbar scrollbar-rounded">
        <div>
          <label className="mb-2 flex items-center text-zinc-600 dark:text-zinc-300">
            <Code className="mr-2" />
            Course Code
          </label>
          <input
            type="text"
            value={courseCode}
            onChange={(e) => {setCourseCode(e.target.value); setIsEmpty(courseInstructor==='' && courseName==='' && description ==='' && e.target.value ==='' && semester === '')}}
            placeholder="Enter course code"
            className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded dark:bg-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="mb-2 flex items-center text-zinc-600 dark:text-zinc-300">
            <BookOpen className="mr-2" />
            Course Name
          </label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => {setCourseName(e.target.value); setIsEmpty(courseInstructor==='' && e.target.value==='' && description ==='' && courseCode ==='' && semester === '')}}
            placeholder="Enter course name"
            className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded dark:bg-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="w-full">
          <label className="mb-2 flex items-center text-zinc-600 dark:text-zinc-300">
            <Code className="mr-2" />
            Branch
          </label>
          <MultipleSelector
            value={branches}
            onChange={setBranches}
            defaultOptions={OPTIONS}
            placeholder="Select Branch you like..."
            className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded dark:bg-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                no results found.
              </p>
            }
          />
        </div>

        <div>
          <label className="mb-2 flex items-center text-zinc-600 dark:text-zinc-300">
            <BookOpen className="mr-2" />
            Course Instructor
          </label>
          <input
            type="text"
            value={courseInstructor}
            onChange={(e) => {setCourseInstructor(e.target.value); setIsEmpty(e.target.value==='' && courseName==='' &&  description ==='' && courseCode ==='' && semester === '')}}
            placeholder="Enter course name"
            className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded dark:bg-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-zinc-600 dark:text-zinc-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => {setDescription(e.target.value); setIsEmpty(courseInstructor==='' && courseName==='' && e.target.value==='' && courseCode ==='' && semester === '')}}
            placeholder="Enter a brief description of the course"
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white scrollbar"
            rows={4}
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
            min={1}
            max={10}
            onChange={(e) => {setSemester(e.target.value); setIsEmpty(courseInstructor==='' && courseName==='' && description ==='' && courseCode ==='' && e.target.value === '')}}
            placeholder="Enter the Semester"
            className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded dark:bg-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full flex items-center justify-center py-2 px-4 rounded ${
            loading || (defaultCourseId === undefined?false:defaultCourseName === courseName && 
                                                            defaultCourseCode === courseCode && 
                                                            defaultDescription === description && 
                                                            defaultCourseInstructor === courseInstructor &&
                                                            defaultSemester === semester &&
                                                            defaultBranches === branches.map((item) => item.value))
              ? 'bg-blue-400 dark:bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
          } text-white focus:outline-none`}
          disabled={loading || (defaultCourseId === undefined?false:defaultCourseName === courseName && 
                                                                    defaultCourseCode === courseCode && 
                                                                    defaultDescription === description && 
                                                                    defaultCourseInstructor === courseInstructor &&
                                                                    defaultSemester === semester &&
                                                                    defaultBranches === branches.map((item) => item.value))}
        >
          <Check className="mr-2" />
          {defaultCourseId === undefined?"Add Course": "Update Course"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
