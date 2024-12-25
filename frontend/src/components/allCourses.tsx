import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Trash2 } from "lucide-react"; // Example icons
import FABMenu from "./FABmenu";
import AddCourse from "./addCourse";
import DelCourse from "./DelCourse";

const AllCourses = ({ user }: { user: any }) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [fabOpen, setFabOpen] = useState(false);
  const [addCoursePop, setAddCoursePop] = useState(false);
  const [delCoursePop, setDelCoursePop] = useState(false);

  const isAuthorized = () => {
    const role = user?.role;
    return role === "cr" || role === "admin";
  };

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
  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddCourse = () => {
    setFabOpen(false);
    setAddCoursePop(true);
  };

  const closeAddCoursePopup = () => {
    setAddCoursePop(false);
    fetchCourses();
  };
  const closeDelCoursePopup = () => {
    setDelCoursePop(false);
    fetchCourses();
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
    <div className="p-4 bg-white dark:bg-zinc-950">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-700 dark:text-white">All Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border flex justify-between items-center rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-700"
            onClick={() => navigate(`/view-course/${course._id}`)}
          >
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">{course.courseName}</h2>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{course.courseCode}</h4>
          </div>
        ))}
      </div>

      {isAuthorized() && (
        <FABMenu items={menuItems} />
      )}

      {isAuthorized() && addCoursePop && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="p-6 rounded-lg shadow-lg max-w-md w-full bg-white dark:bg-zinc-800">
            <AddCourse closePopup={closeAddCoursePopup} />
          </div>
        </div>
      )}

      {isAuthorized() && delCoursePop && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="p-6 rounded-lg shadow-lg max-w-md w-full bg-white dark:bg-zinc-800">
            <DelCourse courses={courses} closePopup={closeDelCoursePopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCourses;


