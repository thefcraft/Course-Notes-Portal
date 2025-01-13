import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Error500PageProps{
  code?: number,
  title?: string,
  message?: string,
  onClick?: () => void,
}

export default function Error500Page({code, title, message, onClick}: Error500PageProps) {
//   useEffect(() => {
//     console.error(error)
//   }, [error])

  return (
    <div className="container flex min-h-full h-full min-w-full mx-auto flex-col items-center justify-center">
      <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
      <h1 className="text-2xl sm:text-4xl font-bold mb-2">{code || 500} - {title || "Internal Server Error"}</h1>
      <p className="text-sm sm:text-xl text-muted-foreground mb-4">{message || "Something went wrong on our end. We're working to fix it!"}</p>
      <div className="flex space-x-4">
        {onClick && <Button onClick={onClick}>Try again</Button>}
        <Button asChild variant="outline">
          <Link to="/">
            Go back home
          </Link>
        </Button>
      </div>
    </div>
  )
}

