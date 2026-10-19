import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MovieCastSection } from "@/features/movies/sections/MovieCastSection"
import type { CastMember } from "@/features/movies/types"

const mockCast: CastMember[] = [
  {
    id: 1,
    name: "Cillian Murphy",
    original_name: "Cillian Murphy",
    character: "J. Robert Oppenheimer",
    profile_path: "/cillian.jpg",
    order: 0,
  },
  {
    id: 2,
    name: "Emily Blunt",
    original_name: "Emily Blunt",
    character: "Katherine Oppenheimer",
    profile_path: "/emily.jpg",
    order: 1,
  },
  {
    id: 3,
    name: "Matt Damon",
    original_name: "Matt Damon",
    character: "Leslie Groves",
    profile_path: "/matt.jpg",
    order: 2,
  },
  {
    id: 4,
    name: "Robert Downey Jr.",
    original_name: "Robert Downey Jr.",
    character: "Lewis Strauss",
    profile_path: "/rdj.jpg",
    order: 3,
  },
]

describe("MovieCastSection component", () => {
  it("renders cast list with names and characters", () => {
    render(<MovieCastSection cast={mockCast} limit={4} />)

    expect(screen.getByTestId("movie-cast-section")).toBeInTheDocument()
    expect(screen.getByText("Cillian Murphy")).toBeInTheDocument()
    expect(screen.getByText("J. Robert Oppenheimer")).toBeInTheDocument()
    expect(screen.getByText("Emily Blunt")).toBeInTheDocument()
  })

  it("limits number of cast displayed according to limit prop", () => {
    render(<MovieCastSection cast={mockCast} limit={2} />)

    expect(screen.getByText("Cillian Murphy")).toBeInTheDocument()
    expect(screen.getByText("Emily Blunt")).toBeInTheDocument()
    expect(screen.queryByText("Matt Damon")).not.toBeInTheDocument()
    expect(screen.queryByText("Robert Downey Jr.")).not.toBeInTheDocument()
  })

  it("returns null when cast array is empty or undefined", () => {
    const { container: c1 } = render(<MovieCastSection cast={[]} />)
    expect(c1.firstChild).toBeNull()

    const { container: c2 } = render(<MovieCastSection cast={undefined} />)
    expect(c2.firstChild).toBeNull()
  })
})
