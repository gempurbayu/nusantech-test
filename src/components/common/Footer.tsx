export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 text-center text-sm text-muted-foreground">
      <div className="container max-w-7xl px-4">
        <p>
          Data provided by{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            TMDB API
          </a>
          . Built for Web Application Technical Test.
        </p>
      </div>
    </footer>
  )
}
