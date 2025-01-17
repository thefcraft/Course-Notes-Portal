'use client'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { users, courses } from '../../lib/data'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Book, BookOpen, CheckCircle, Clock, Activity, FileText } from 'lucide-react'
import axios from 'axios'
import { API_URL } from '@/lib/constants'
import { User, Course as TypeCourse } from "@/lib/types";
import { Loading } from '@/components/utils'
import toast from 'react-hot-toast'
import { Icons } from '@/components/icons'

import { motion } from 'framer-motion'
import { Skeleton } from "@/components/ui/skeleton"



export default function DashboardPage({user}: {user: User|null}) {
  const [loadingCourse, setLoadingCourse] = useState<boolean>(true);
    
  const [courses, setCourses] = useState<TypeCourse[]>([]);
  
  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/content/all-courses`
      );
      if(response.data.courses) setCourses(response.data.courses);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to fetch courses")
    }finally{
      setLoadingCourse(false);
    }
  };
  
  useEffect(() => {
    fetchCourses();
  }, []);

  if (user === null) return <Loading/>;
  const enrolledCourses = courses.filter(course => user.enrolledCourses.includes(course._id))


  return (
      <main className="flex-grow container mx-auto px-4 py-8 pt-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Enrolled Courses</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loadingCourse
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="flex flex-col">
                    <CardHeader className="pb-4">
                      <Skeleton className="h-6 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-9 w-full" />
                    </CardFooter>
                  </Card>
                ))
              : enrolledCourses.map((course) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col h-full"
                  >
                    <Card className="flex flex-col h-full">
                      <CardHeader className='h-full'>
                        <CardTitle className='line-clamp-2'>{course.courseCode}: {course.courseName}</CardTitle>
                        <CardDescription>
                          <span className='line-clamp-1'>{course.courseInstructor || 'Instructor not assigned'}</span>
                          <br/>
                          <p className='line-clamp-2'>{course.description}</p>
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className='justify-center'>
                        <Link to={`/view-course/${course._id}`}>
                          <Button variant="outline" className="w-full">
                            <Book className="w-4 h-4 mr-2" />
                            View Course
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
          </div>
          {
            !loadingCourse && enrolledCourses.length === 0 && (
              <div className="text-center mt-6 p-6 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg">
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">You haven't enrolled in any courses yet.</p>
                <p className="text-sm text-gray-500 mb-6">Take a look at our available courses and sign up today!</p>
                <Link to='/all-courses'>
                  <Button variant="outline" className="w-full max-w-sm mx-auto text-blue-600 border-blue-600 hover:bg-blue-50">
                    <Book className="w-4 h-4 mr-2" />
                    Enroll Courses
                  </Button>
                </Link>
              </div>
            )
          }
        </section>
      </main>
  )
}



// export default function DashboardPage({user}: {user: User|null}) {
//    return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Dashboard</h1>
//       <div>
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <BookOpen className="mr-2 h-5 w-5 text-blue-500" />
//               Enrolled Courses
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {enrolledCourses.length === 0 ? (loadingCourse?<>
//                 <Icons.spinner className="h-16 w-16 animate-spin text-primary" />
//               </>:<>
//                 <p className="text-gray-600 mb-2">You are not enrolled in any courses yet.</p>
//                 <Link to={'/all-courses'} className='hover:underline text-blue-500'>Enroll Course</Link>
//               </>
//             ) : (
//               <ul className="space-y-2">
//                 {enrolledCourses.map((course) => (
//                   <li key={course._id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
//                     <span className="font-medium text-gray-900">{course.courseCode}: {course.courseName}</span>
//                     <Link to={`/view-course/${course._id}`}>
//                       <Button variant="outline" size="sm">View</Button>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//       {/* <div>
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <Activity className="mr-2 h-5 w-5 text-green-500" />
//               Recent Activity
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {recentActivity.length === 0 ? (
//               <p className="text-gray-600">No recent activity.</p>
//             ) : (
//               <ul className="space-y-2">
//                 {recentActivity.map((activity) => (
//                   <li key={activity.id} className="flex items-center bg-gray-50 p-3 rounded-md">
//                     {activity.type === 'enrollment' && <BookOpen className="mr-3 h-5 w-5 text-blue-500" />}
//                     {activity.type === 'assignment_submission' && <CheckCircle className="mr-3 h-5 w-5 text-green-500" />}
//                     {activity.type === 'resource_access' && <FileText className="mr-3 h-5 w-5 text-yellow-500" />}
//                     <div>
//                       <span className="font-medium text-gray-900">{activity.details}</span>
//                       <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </CardContent>
//         </Card>
//       </div> */}
//     </div>
//   )
// }

