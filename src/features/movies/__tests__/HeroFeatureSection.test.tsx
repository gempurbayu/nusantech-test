import { describe, it, expect, vi } from "vitest"
import { screen, fireEvent, waitFor } from "@testing-library/react"
import { renderWithProviders } from "@/test/test-utils"
import { HeroFeatureSection } from "@/features/movies/sections/HeroFeatureSection"
import { movieApi } from "@/features/movies/api"
import type { Movie } from "@/features/movies/types"

const mockHeroMovie: Movie = {
  id: 693134,
  title: "Dune: Part Two",
  original_title: "Dune: Part Two",
  overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators.",
  poster_path: "/dune_poster.jpg",
  backdrop_path: "/dune_backdrop.jpg",
  release_date: "2024-03-01",
  vote_average: 8.5,
  vote_count: 5400,
  popularity: 1200.4,
  genre_ids: [878, 12],
}

describe("HeroFeatureSection component", () => {
  it("returns null if movie is undefined", () => {
    const { container } = renderWithProviders(<HeroFeatureSection movie={undefined} />)
    expect(container.firstChild).toBeNull()
  })

  it("renders movie title, release year, rating, and synopsis", () => {
    renderWithProviders(<HeroFeatureSection movie={mockHeroMovie} />)

    expect(screen.getByRole("heading", { level: 1, name: "Dune: Part Two" })).toBeInTheDocument()
    expect(screen.getByText("2024")).toBeInTheDocument()
    expect(screen.getByText("8.5")).toBeInTheDocument()
    expect(screen.getByText(/Paul Atreides unites with Chani/i)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /View Film Details/i })).toHaveAttribute(
      "href",
      "/movie/693134"
    )
  })

  it("fetches trailer and opens trailer modal on play trailer button click", async () => {
    vi.spyOn(movieApi, "getMovieVideos").mockResolvedValueOnce([
      {
        id: "vid-1",
        key: "Way9Dexny3w",
        name: "Official Trailer",
        site: "YouTube",
        type: "Trailer",
        official: true,
        published_at: "2024-01-01",
      },
    ])

    renderWithProviders(<HeroFeatureSection movie={mockHeroMovie} />)

    const trailerBtn = screen.getByRole("button", { name: /Play Trailer/i })
    fireEvent.click(trailerBtn)

    await waitFor(() => {
      expect(movieApi.getMovieVideos).toHaveBeenCalledWith(693134)
      expect(screen.getByTestId("trailer-modal")).toBeInTheDocument()
    })
  })
})
