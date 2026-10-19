import { describe, it, expect } from "vitest"
import { getReleaseYear, formatFullDate } from "@/utils/formatDate"

describe("formatDate utils", () => {
  describe("getReleaseYear", () => {
    it("extracts year from valid ISO date string", () => {
      expect(getReleaseYear("2024-03-01")).toBe("2024")
      expect(getReleaseYear("1999-12-31")).toBe("1999")
    })

    it("returns 'N/A' for null or undefined or empty string", () => {
      expect(getReleaseYear(null)).toBe("N/A")
      expect(getReleaseYear(undefined)).toBe("N/A")
      expect(getReleaseYear("")).toBe("N/A")
    })

    it("returns 'N/A' for invalid date strings", () => {
      expect(getReleaseYear("invalid-date")).toBe("N/A")
    })
  })

  describe("formatFullDate", () => {
    it("formats valid date string into Month Day, Year", () => {
      const result = formatFullDate("2024-03-01")
      expect(result).toMatch(/March \d+, 2024/)
    })

    it("returns 'N/A' for null, undefined, or invalid dates", () => {
      expect(formatFullDate(null)).toBe("N/A")
      expect(formatFullDate(undefined)).toBe("N/A")
      expect(formatFullDate("not-a-real-date")).toBe("N/A")
    })
  })
})
