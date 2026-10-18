import { Outlet, ScrollRestoration } from "react-router-dom"
import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"

export function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
