import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { renderWithProviders } from "@/test/test-utils"
import { MovieCard } from "@/features/movies/components/MovieCard"
import type { Movie } from "@/features/movies/types"

const mockMovie: Movie = {
  id: 12345,
  title: "Inception",
  original_title: "Inception",
  overview: "A thief who steals corporate secrets through the use of dream-sharing technology.",
  poster_path: "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
  backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
  release_date: "2010-07-16",
  vote_average: 8.4,
  vote_count: 34000,
  popularity: 120.5,
  genre_ids: [28, 878],
}

describe("MovieCard", () => {
  it("renders movie title, release year, and rating correctly", () => {
    renderWithProviders(<MovieCard movie={mockMovie} />)

    expect(screen.getByText("Inception")).toBeInTheDocument()
    expect(screen.getByText("2010")).toBeInTheDocument()
    expect(screen.getByText("8.4")).toBeInTheDocument()
  })

  it("links to the correct movie detail page", () => {
    renderWithProviders(<MovieCard movie={mockMovie} />)

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/movie/12345")
  })
})
