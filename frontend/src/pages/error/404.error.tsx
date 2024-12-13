import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Error404Page() {
  return (
    <div className="container flex min-h-full h-full min-w-full mx-auto flex-col items-center justify-center">
      <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
      <h1 className="text-2xl sm:text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-sm sm:text-xl text-muted-foreground mb-4">Oops! The page you're looking for doesn't exist.</p>
      <Button asChild>
        <Link to="/">
          Go back home
        </Link>
      </Button>
    </div>
  )
}

