import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useDebounce } from "@/hooks/useDebounce"

describe("useDebounce hook", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 400))
    expect(result.current).toBe("initial")
  })

  it("updates value only after delay passes", () => {
    const { result, rerender } = renderHook(
      ({ val, delay }: { val: string; delay: number }) => useDebounce(val, delay),
      { initialProps: { val: "first", delay: 400 } }
    )

    expect(result.current).toBe("first")

    rerender({ val: "second", delay: 400 })
    expect(result.current).toBe("first")

    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(result.current).toBe("first")

    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(result.current).toBe("second")
  })

  it("resets timer if value changes rapidly within delay", () => {
    const { result, rerender } = renderHook(
      ({ val }: { val: string }) => useDebounce(val, 300),
      { initialProps: { val: "A" } }
    )

    rerender({ val: "B" })
    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(result.current).toBe("A")

    rerender({ val: "C" })
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(result.current).toBe("A")

    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(result.current).toBe("C")
  })
})
