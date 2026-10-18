import { createBrowserRouter } from "react-router-dom"
import { App } from "./App"
import { HomePage } from "@/pages/HomePage"
import { MovieDetailPage } from "@/pages/MovieDetailPage"
import { NotFoundPage } from "@/pages/NotFoundPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movie/:id",
        element: <MovieDetailPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
])
