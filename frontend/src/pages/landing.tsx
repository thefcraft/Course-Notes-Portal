import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Users, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { authPrefix } from '@/pages/auth/constants.auth'

export default function LandingPage() {
  return (
    <div className="h-full bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Welcome to <span className="text-blue-600">College Notes</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Access course materials, collaborate with peers, and excel in your studies with our comprehensive note-sharing platform.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link to={`${authPrefix}/signup`}>
                <Button className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                  Get started
                  <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link to={`${authPrefix}/login`}>
                <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10">
                  Log in
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold text-gray-900 dark:text-white">
                  <BookOpen className="h-6 w-6 text-blue-500 mr-2" />
                  Comprehensive Course Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                  Access a wide range of course notes, study guides, and resources for all your classes.
                </p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold text-gray-900 dark:text-white">
                  <Users className="h-6 w-6 text-blue-500 mr-2" />
                  Collaborate with Peers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                  Share notes, discuss topics, and work together with classmates to enhance your learning experience.
                </p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold text-gray-900 dark:text-white">
                  <Calendar className="h-6 w-6 text-blue-500 mr-2" />
                  Stay Organized
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                  Keep track of assignments, deadlines, and study schedules all in one place.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Join thousands of students already using College Notes
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Sign up today and start improving your academic performance!
          </p>
          <div className="mt-6">
            <Link to={`${authPrefix}/signup`}>
              <Button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                Create your free account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
