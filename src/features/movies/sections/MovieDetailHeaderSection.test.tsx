import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { renderWithProviders } from "@/test/test-utils"
import { MovieDetailHeaderSection } from "./MovieDetailHeaderSection"
import type { MovieDetail } from "../types"

const mockDetail: MovieDetail = {
  id: 693134,
  title: "Dune: Part Two",
  original_title: "Dune: Part Two",
  overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge.",
  poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s520fff.jpg",
  release_date: "2024-02-27",
  vote_average: 8.6,
  vote_count: 12480,
  popularity: 980.5,
  genre_ids: [878, 12],
  genres: [
    { id: 878, name: "Science Fiction" },
    { id: 12, name: "Adventure" },
  ],
  runtime: 166,
  tagline: "Long live the fighters.",
  status: "Released",
  budget: 190000000,
  revenue: 711844358,
  original_language: "en",
  production_companies: [
    { id: 923, name: "Legendary Pictures", logo_path: null, origin_country: "US" },
  ],
  credits: {
    cast: [
      {
        id: 1190668,
        name: "Timothée Chalamet",
        original_name: "Timothée Chalamet",
        character: "Paul Atreides",
        profile_path: "/BE2sdjpg.jpg",
        order: 0,
      },
    ],
    crew: [
      {
        id: 137427,
        name: "Denis Villeneuve",
        job: "Director",
        department: "Directing",
        profile_path: null,
      },
    ],
  },
  videos: {
    results: [
      {
        id: "vid1",
        key: "Way9Dexny3w",
        name: "Official Trailer",
        site: "YouTube",
        type: "Trailer",
        official: true,
        published_at: "2023-11-01",
      },
    ],
  },
}

describe("MovieDetailHeaderSection", () => {
  it("renders movie title, tagline, synopsis, and director", () => {
    renderWithProviders(<MovieDetailHeaderSection movie={mockDetail} />)

    expect(screen.getByRole("heading", { level: 1, name: "Dune: Part Two" })).toBeInTheDocument()
    expect(screen.getByText(/Long live the fighters/i)).toBeInTheDocument()
    expect(screen.getByText(/Paul Atreides unites with Chani/i)).toBeInTheDocument()
    expect(screen.getByText("Denis Villeneuve")).toBeInTheDocument()
  })

  it("renders back button to movie catalog", () => {
    renderWithProviders(<MovieDetailHeaderSection movie={mockDetail} />)

    const backButton = screen.getByTestId("back-button")
    expect(backButton).toBeInTheDocument()
    expect(backButton).toHaveTextContent(/Back to Movie Catalog/i)
  })

  it("renders watch trailer button when trailer is available", () => {
    renderWithProviders(<MovieDetailHeaderSection movie={mockDetail} />)

    const trailerButton = screen.getByRole("button", { name: /Watch Official Trailer/i })
    expect(trailerButton).toBeInTheDocument()
    expect(trailerButton).toBeEnabled()
  })
})
