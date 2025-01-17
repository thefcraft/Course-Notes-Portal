import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Link } from 'react-router-dom';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { GraduationCap } from "lucide-react";
export default function Header({ className }: {className?:string}) {
  const {isLoading, user} = useAuthStore(); 
  const isVerified = user;
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm h-16">
      <div className={cn("container mx-auto px-4 py-3 h-16 flex justify-between items-center", className)}>
        <Link to="/" className="flex-shrink-0 flex items-center pl-1">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h1 className="ml-2 text-xl font-bold tracking-tight">NotesHub</h1>
        </Link>
        <nav className="hidden md:block">
            {isVerified?
                <ul className="flex space-x-4">
                    <li className="border-transparent border-b-2 hover:text-muted-foreground hover:border-muted">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="border-transparent border-b-2 hover:text-muted-foreground hover:border-muted">
                      <Link to="/all-courses">Courses</Link>
                    </li>
                    <li className="border-transparent border-b-2 hover:text-muted-foreground hover:border-muted">
                      <Link to="/profile">Profile</Link>
                    </li>
                </ul>
                :
                <ul className="flex space-x-4">
                    <li className="border-transparent border-b-2 hover:text-muted-foreground hover:border-muted">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="border-transparent border-b-2 hover:text-muted-foreground hover:border-muted">
                      <Link to="/all-courses">Courses</Link>
                    </li>
                </ul>
            }
        </nav>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button asChild className="hidden md:inline-flex">
            {isVerified?
                <Link to="/auth/logout">
                  Logout
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                </Link>
                :
                <Link to="/auth/login">Login</Link>
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
                {isVerified?
                  <>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/all-courses">Courses</Link>
                    <Link to="/profile">Profile</Link>
                    <Button asChild>
                      <Link to="/auth/logout">
                        Logout
                        {isLoading && (
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                      </Link>
                    </Button>
                  </>
                  :
                  <>
                    <Link to="/">Home</Link>
                    <Link to="/all-courses">Courses</Link>
                    <Button asChild>
                      <Link to="/auth/login">Login</Link>
                    </Button>
                  </>
                }
              </nav>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
}
