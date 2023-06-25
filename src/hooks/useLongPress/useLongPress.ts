'use client'

import { useEffect, useState } from 'react'

type HandlerType = {
  onMouseDown: () => void
  onMouseUp: () => void
  onMouseLeave: () => void
  onTouchStart: () => void
  onTouchEnd: () => void
}

export const useLongPress = (callback: () => void, ms: number): HandlerType => {
  const [isPressing, setIsPressing] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined

    if (isPressing) {
      timeout = setTimeout(callback, ms)
    } else {
      clearTimeout(timeout as NodeJS.Timeout)
    }

    return () => {
      clearTimeout(timeout as NodeJS.Timeout)
    }
  }, [callback, isPressing, ms])

  const start = () => {
    setIsPressing(true)
  }

  const stop = () => {
    setIsPressing(false)
  }

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  }
}
