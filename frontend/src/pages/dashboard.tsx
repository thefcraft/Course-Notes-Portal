'use client'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { users, courses } from '../../lib/data'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, CheckCircle, Clock, Activity, FileText } from 'lucide-react'
import axios from 'axios'
import { API_URL } from '@/lib/constants'
import { User, Course as TypeCourse } from "@/lib/types";
import { Loading } from '@/components/utils'
import toast from 'react-hot-toast'

export default function DashboardPage({user}: {user: User|null}) {
  // const user = users[0] // In a real app, you'd fetch the logged-in user
  // const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([
    //   { id: '1', type: 'enrollment', courseId: 'cs101', date: '2023-06-01', details: 'Enrolled in Introduction to Computer Science' },
    //   { id: '2', type: 'assignment_submission', courseId: 'math201', date: '2023-06-05', details: 'Submitted Calculus Quiz' },
    //   { id: '3', type: 'resource_access', courseId: 'cs101', date: '2023-06-07', details: 'Accessed Programming Basics notes' },
    // ])
    
  const [courses, setCourses] = useState<TypeCourse[]>([]);
  
  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/content/all-courses`
      );
      setCourses(response.data.courses);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to fetch courses")
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  if (user === null) return <Loading/>;
  const enrolledCourses = courses.filter(course => user.enrolledCourses.includes(course._id))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Dashboard</h1>
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-blue-500" />
              Enrolled Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            {enrolledCourses.length === 0 ? (<>
              <p className="text-gray-600 mb-2">You are not enrolled in any courses yet.</p>
              <Link to={'/all-courses'} className='hover:underline text-blue-500'>Enroll Course</Link>
            </>
            ) : (
              <ul className="space-y-2">
                {enrolledCourses.map((course) => (
                  <li key={course._id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                    <span className="font-medium text-gray-900">{course.courseCode}: {course.courseName}</span>
                    <Link to={`/view-course/${course._id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
      {/* <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-green-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p className="text-gray-600">No recent activity.</p>
            ) : (
              <ul className="space-y-2">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="flex items-center bg-gray-50 p-3 rounded-md">
                    {activity.type === 'enrollment' && <BookOpen className="mr-3 h-5 w-5 text-blue-500" />}
                    {activity.type === 'assignment_submission' && <CheckCircle className="mr-3 h-5 w-5 text-green-500" />}
                    {activity.type === 'resource_access' && <FileText className="mr-3 h-5 w-5 text-yellow-500" />}
                    <div>
                      <span className="font-medium text-gray-900">{activity.details}</span>
                      <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}

