import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles, Trash2 } from "lucide-react"; // Example icons
import FABMenu from '@/components/FABMenu';
import AddCourse from '@/components/addCourse';
import DelCourse from '@/components/DelCourse';
import { API_URL } from "@/lib/constants";
import { User, Course as TypeCourse } from "@/lib/types";
import Course from '@/components/course';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const AllCourses = ({ user }: { user: User|null }) => {
  const [courses, setCourses] = useState<TypeCourse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [fabOpen, setFabOpen] = useState(false);
  const [addCoursePop, setAddCoursePop] = useState(false);
  const [delCoursePop, setDelCoursePop] = useState(false);
  const addCourseRef =  useRef<HTMLDivElement | null>(null);
  const delCourseRef =  useRef<HTMLDivElement | null>(null);
  const [addCourseIsEmpty, setAddCourseIsEmpty] = useState<boolean>(true);

  const [searchTerm, setSearchTerm] = useState('')
  const [showEligibleOnly, setShowEligibleOnly] = useState(false)
  
  const filteredCourses = courses.filter(course => 
    (
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
    )
  
    // (course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // course.courseName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    // (!showEligibleOnly || (user.semester >= course.semester && (user.branch === course.branch || course.branch === 'All')))
  )


  const isAuthorized = () => {
    const role = user?.role;
    return role === "cr" || role === "admin";
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/content/all-courses`
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

  const handleAutoCloseAddCourse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (addCourseRef.current && addCourseRef.current.contains(e.target as Node)) return;
    if (!addCourseIsEmpty) return;
    closeAddCoursePopup();
    setAddCourseIsEmpty(true);
  }
  const handleAutoCloseDelCourse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (delCourseRef.current && delCourseRef.current.contains(e.target as Node)) return;
    closeDelCoursePopup();
  }

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
    <div className="p-4 bg-background space-y-4">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-muted dark:to-accent text-white py-16 rounded-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Discover Your Courses
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl">
              Access course materials, notes, and resources all in one place.
            </p>
          </div>
          <div className="mt-10 max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white text-gray-900"
                />
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm">
                <Switch
                  id="eligible-courses"
                  checked={showEligibleOnly}
                  onCheckedChange={setShowEligibleOnly}
                  className="dark:bg-muted-foreground"
                />
                <Label htmlFor="eligible-courses" className="text-white cursor-pointer">Eligible only</Label>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course, index) => (
            <Course course={course} key={index}/>
          ))}
        </div>

        {isAuthorized() && (
          <FABMenu items={menuItems} />
        )}

        {isAuthorized() && addCoursePop && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50" onClick={handleAutoCloseAddCourse}>
            <div className="max-w-md w-full mx-2" ref={addCourseRef}>
              <AddCourse closePopup={closeAddCoursePopup} setIsEmpty={setAddCourseIsEmpty} />
            </div>
          </div>
        )}

        {isAuthorized() && delCoursePop && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50" onClick={handleAutoCloseDelCourse}>
            <div className="max-w-md w-full mx-2" ref={delCourseRef}>
              <DelCourse courses={courses} closePopup={closeDelCoursePopup} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AllCourses;


