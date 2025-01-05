import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Course as TypeCourse } from '@/lib/types';

import { useNavigate } from "react-router-dom";
import { BookOpen } from 'lucide-react';

export default function Course({course}: {course: TypeCourse}){
    const navigate = useNavigate();

    return <Card className="h-full flex flex-col hover:shadow-lg hover:bg-muted transition-shadow duration-200 cursor-pointer" onClick={() => navigate(`/view-course/${course._id}`)}>
    <CardContent className="p-6 flex flex-col flex-grow">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 line-clamp-1">{course.courseCode}</h2>
        <BookOpen className="h-5 w-5 text-blue-500" />
      </div>  
      <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200 line-clamp-1">{course.courseName}</h3>
      <p className="text-neutral-600 dark:text-neutral-400 flex-grow line-clamp-2">course.description Fundamental concepts of programming and computer systems</p>
      <div className="mt-4">
        <p className="text-sm text-neutral-800 dark:text-neutral-200 ">Semester: {course.semester}</p>
        <p className="text-sm text-neutral-800 dark:text-neutral-200 ">Branch: {course.branch.length === 0?'All':course.branch.join(', ')}</p>
        {/* <Link to={`/view-course/${course._id}`}>
          <Button variant="outline">View Course</Button>
        </Link> */}
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