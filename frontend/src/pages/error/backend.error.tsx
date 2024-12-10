// Backend not found...
import { ServerOff } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function ErrorBackendPage() {
  return (
    <div className="container flex h-screen mx-auto -mt-16 w-screen flex-col items-center justify-center px-4">
      <ServerOff className="h-16 w-16 text-destructive mb-4" />
      <h1 className="text-4xl font-bold mb-2">Backend Not Running</h1>
      <p className="text-xl text-muted-foreground mb-4">Our servers are taking a quick nap. Please wait while we wake them up!</p>
      <Button onClick={() => window.location.reload()}>
        Retry Connection
      </Button>
    </div>
  )
}

