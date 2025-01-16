import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Course as TypeCourse } from '@/lib/types';

import { useNavigate } from "react-router-dom";
import { BookOpen } from 'lucide-react';

export default function Course({course}: {course: TypeCourse}){
    const navigate = useNavigate();

    return <Card 
    className="h-full flex flex-col hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-shadow duration-300 cursor-pointer rounded-lg"
    onClick={() => navigate(`/view-course/${course._id}`)}
  >
    <CardContent className="p-6 flex flex-col flex-grow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 truncate">{course.courseCode}</h2>
        <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>

      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 truncate">{course.courseName}</h3>
      <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 truncate">
        <span>{course.courseInstructor || 'Instructor not assigned'}</span>
      </div>

      <p className="text-neutral-600 dark:text-neutral-400 flex-grow mt-2 line-clamp-2">
        {course.description || <span className="italic text-gray-500">No description available</span>}
      </p>

      <div className="mt-4 text-sm text-neutral-800 dark:text-neutral-200 space-y-1">
        <p><strong>Semester:</strong> {course.semester || 'N/A'}</p>
        <p><strong>Branch:</strong> {course.branch.length === 0 ? 'All branches' : course.branch.join(', ')}</p>
      </div>

      <div className="mt-3 flex items-center text-sm text-neutral-600 dark:text-neutral-400">
        <span className="mr-2">Notes:</span>
        <span className="text-blue-600 dark:text-blue-400">{course.notes.length} {course.notes.length === 1 ? 'note' : 'notes'}</span>
      </div>
    </CardContent>
  </Card>

  //   return <Card key={course._id} className='cursor-pointer hover:bg-muted' onClick={() => navigate(`/view-course/${course._id}`)}>
  //   <CardContent className="p-6">
  //     <h2 className="text-xl font-semibold mb-2">{course.courseCode}: {course.courseName}</h2>
  //     <p className="mb-2 text-muted-foreground">Advanced calculus topics including integration techniques and series</p> {/* TODO add course description */}
  //     <p className="text-sm mb-2">Semester: {course.semester} | Branch: Computer Science</p> {/* {course.branch} */}
  //     {/* <Link to={`/view-course/${course._id}`}>
  //       <Button className='mt-4'>View Course</Button>
  //     </Link> */}
  //   </CardContent>
  // </Card>
}