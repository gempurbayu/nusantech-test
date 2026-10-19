import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { renderWithProviders } from "@/test/test-utils"
import { MovieGrid } from "@/features/movies/components/MovieGrid"
import type { Movie } from "@/features/movies/types"

const mockMovies: Movie[] = [
  {
    id: 101,
    title: "Oppenheimer",
    original_title: "Oppenheimer",
    overview: "The story of J. Robert Oppenheimer's role in the Manhattan Project.",
    poster_path: "/oppenheimer.jpg",
    backdrop_path: "/oppenheimer_bg.jpg",
    release_date: "2023-07-21",
    vote_average: 8.2,
    vote_count: 7500,
    popularity: 500.5,
    genre_ids: [18, 36],
  },
  {
    id: 102,
    title: "Barbie",
    original_title: "Barbie",
    overview: "To live in Barbie Land is to be a perfect being in a perfect place.",
    poster_path: "/barbie.jpg",
    backdrop_path: "/barbie_bg.jpg",
    release_date: "2023-07-21",
    vote_average: 7.1,
    vote_count: 8200,
    popularity: 450.2,
    genre_ids: [35, 12],
  },
]

describe("MovieGrid component", () => {
  it("renders a list of movie cards", () => {
    renderWithProviders(<MovieGrid movies={mockMovies} />)

    expect(screen.getByTestId("movie-grid")).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "Oppenheimer" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "Barbie" })).toBeInTheDocument()
  })

  it("renders loading skeleton placeholders when isLoading is true and movies array is empty", () => {
    renderWithProviders(<MovieGrid movies={[]} isLoading={true} skeletonCount={5} />)

    expect(screen.getByTestId("movie-grid-loading")).toBeInTheDocument()
    expect(screen.queryByTestId("movie-grid")).not.toBeInTheDocument()
  })

  it("renders movie cards even when isLoading is true if movies already exist (subsequent page fetch)", () => {
    renderWithProviders(<MovieGrid movies={mockMovies} isLoading={true} />)

    expect(screen.getByTestId("movie-grid")).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "Oppenheimer" })).toBeInTheDocument()
  })
})
