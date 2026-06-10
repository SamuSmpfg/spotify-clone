import { useEffect, useState } from "react"

function useDebounce<T>(value: T, delay?: number): T {
  const [deboundedValue, setDeboundedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeboundedValue(value)
    }, delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return deboundedValue
}

export default useDebounce