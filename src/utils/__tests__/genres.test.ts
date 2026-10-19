import { describe, it, expect } from "vitest"
import { getGenreNames, TMDB_GENRES } from "@/utils/genres"

describe("genres utils", () => {
  it("translates genre IDs to readable genre names", () => {
    expect(getGenreNames([28, 12])).toEqual(["Action", "Adventure"])
    expect(getGenreNames([878, 35])).toEqual(["Sci-Fi", "Comedy"])
  })

  it("limits number of returned genres according to max parameter", () => {
    expect(getGenreNames([28, 12, 878, 35], 2)).toEqual(["Action", "Adventure"])
    expect(getGenreNames([28, 12, 878, 35], 3)).toEqual(["Action", "Adventure", "Sci-Fi"])
  })

  it("filters out unknown genre IDs", () => {
    expect(getGenreNames([999999, 28])).toEqual(["Action"])
  })

  it("returns empty array for empty or undefined genreIds", () => {
    expect(getGenreNames([])).toEqual([])
    expect(getGenreNames(undefined)).toEqual([])
  })

  it("exports TMDB_GENRES map containing common genre IDs", () => {
    expect(TMDB_GENRES[28]).toBe("Action")
    expect(TMDB_GENRES[878]).toBe("Sci-Fi")
    expect(TMDB_GENRES[27]).toBe("Horror")
  })
})
