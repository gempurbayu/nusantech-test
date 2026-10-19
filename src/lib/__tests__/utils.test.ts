import { describe, it, expect } from "vitest"
import { cn } from "@/lib/utils"

describe("cn utility", () => {
  it("combines class names cleanly", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2")
  })

  it("handles conditional classes and falsy values", () => {
    const isHidden = false
    const isVisible = true
    expect(cn("base-class", isHidden && "hidden", isVisible && "block", null, undefined)).toBe(
      "base-class block"
    )
  })

  it("resolves conflicting Tailwind utilities via tailwind-merge", () => {
    expect(cn("p-4", "p-8")).toBe("p-8")
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500")
  })
})
