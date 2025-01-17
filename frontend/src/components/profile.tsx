'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Branch, branches, User } from '@/lib/types'
import { Loading } from '@/components/utils'

export default function ProfilePage({user}: {user: User | null}) {
  if (user === null) return <Loading/>;
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [branch, setBranch] = useState<Branch>(user.branch)
  const [semester, setSemester] = useState(user.semester)

  console.log(user)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO
    console.log('Profile updated:', { name, email, branch, semester })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required disabled/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled />
              </div>
              <div>
                <label htmlFor="branch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Branch</label>
                <Select value={branch} onValueChange={(b: any) => setBranch(b)} disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((b: Branch, index) => <SelectItem value={b} key={index}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester</label>
                <Select value={semester.toString()} onValueChange={(value) => setSemester(parseInt(value))} disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sem) => (
                      <SelectItem key={sem} value={sem.toString()}>{sem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* <Button type="submit" className="w-full" disabled>Update Profile</Button> */}
            </form>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            {user.enrolledCourses.length === 0 ? (
              <p className="text-gray-600">You are not enrolled in any courses yet.</p>
            ) : (
              <ul className="space-y-2">
                {user.enrolledCourses.map((courseId) => {
                  const course = courses.find((c) => c.id === courseId)
                  return course ? (
                    <li key={courseId} className="bg-gray-50 p-3 rounded-md">
                      <span className="font-medium text-gray-900">{course.code}: {course.name}</span>
                      <span className="text-sm text-gray-500 ml-2">(Semester: {course.semester})</span>
                    </li>
                  ) : null
                })}
              </ul>
            )}
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}

