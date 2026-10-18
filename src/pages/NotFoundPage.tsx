import { Link } from "react-router-dom"
import { Film } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  return (
    <div className="container max-w-7xl px-4 py-24 flex flex-col items-center justify-center text-center">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-6">
        <Film className="h-8 w-8 text-muted-foreground" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-2">404 - Page Not Found</h1>
      <p className="text-muted-foreground max-w-md mb-6">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  )
}
