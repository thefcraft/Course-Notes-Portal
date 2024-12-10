import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Link } from 'react-router-dom';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { ModeToggle } from "@/components/mode-toggle"
import { User } from "@/store/authStore";

export default function Header({ user }: {user:User|null}) {
  const isVerified = user?.isVerified;
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm h-16">
      <div className="container mx-auto px-4 py-3 h-16 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          Notes Share Portal
        </a>
        <nav className="hidden md:block">
            {isVerified?
                <ul className="flex space-x-4">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
                :
                <ul className="flex space-x-4">
                    <li><Link to="/about">About</Link></li>
                </ul>
            }
        </nav>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button asChild className="hidden md:inline-flex">
            {isVerified?
                <Link to="/logout">Logout</Link>
                :
                <Link to="/login">Login</Link>
            }
          </Button>
          {/* Mobile Menu using Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Icons.menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-4">
              <nav className="flex flex-col space-y-4">
                <Link to="/roadmaps">Roadmaps</Link>
                <Link to="/resources">Resources</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/courses">Courses</Link>
                <Link to="/community">Community</Link>
                <Button asChild>
                  <Link to="/login">Login</Link>
                </Button>
              </nav>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
}
