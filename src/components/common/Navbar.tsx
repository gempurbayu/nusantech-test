import { Film } from "lucide-react"
import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <Film className="h-6 w-6 text-primary" />
          <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            CineFlix
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link
            to="/"
            className="transition-colors hover:text-foreground font-medium"
          >
            Movies
          </Link>
        </nav>
      </div>
    </header>
  )
}
