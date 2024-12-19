import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Sparkles, Trash2 } from "lucide-react"; // Example icons
import FABMenu from "./FABmenu";
import AddCourse from "./addCourse";
import DelCourse from "./DelCourse";

const AllCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [fabOpen, setFabOpen] = useState(false);
  const [addCoursePop, setAddCoursePop] = useState(false);
  const [delCoursePop, setDelCoursePop] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/content/all-courses`
        );
        setCourses(response.data.courses);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch courses");
      }
    };

    fetchCourses();
  }, []);


  const handleAddCourse = () => {
    setFabOpen(false);
    setAddCoursePop(true);
  };
  
  const closeAddCoursePopup = () => {
    setDelCoursePop(false);
  };
  
  const handleDeleteCourse = () => {
    setFabOpen(false);
    setDelCoursePop(true);
  };


  const menuItems = [
    {
      label: 'Add Course',
      icon: <Sparkles className="h-5 w-5 mr-2 text-gray-300" />,
      onClick: handleAddCourse,
    },
    {
      label: 'Delete Course',
      icon: <Trash2 className="h-5 w-5 mr-2 text-gray-300" />,
      onClick: handleDeleteCourse,
    },
  ];


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">All Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition"
            onClick={() => navigate(`/view-course/${course._id}`)}
          >
            <h2 className="text-lg font-semibold text-gray-700">{course.courseName}</h2>
          </div>
        ))}
      </div>


      <FABMenu items={menuItems} />

      {addCoursePop && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className=" p-6 rounded-lg shadow-lg max-w-md w-full">
            <AddCourse closePopup={closeAddCoursePopup} />
          </div>
        </div>
      )}
      {delCoursePop && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className=" p-6 rounded-lg shadow-lg max-w-md w-full">
            <DelCourse courses={courses} closePopup={closeAddCoursePopup} />
          </div>
        </div>
      )}
    </div>
  );


  
};

export default AllCourses;


