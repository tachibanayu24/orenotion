'use client'

import React, { useState, useEffect, createContext, ComponentProps, ReactNode } from 'react'

import { Snackbar } from '../uis/Snackbar'

type SnackProviderType = {
  addSnack: ({ type, message }: ComponentProps<typeof Snackbar>) => void
}

export const SnackBarContext = createContext<SnackProviderType>({
  addSnack: () => void 0,
})

type Props = {
  children: ReactNode
}

export const SnackbarProvider = ({ children }: Props) => {
  const [options, setOptions] = useState<ComponentProps<typeof Snackbar>[]>([])

  useEffect(() => {
    if (options.length > 0) {
      const timer = setTimeout(() => {
        setOptions((option) => option.slice(1))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [options.length])

  const addSnack = (option: ComponentProps<typeof Snackbar>) => {
    // 3個までスタックする
    if (options.length === 3) {
      const reduced = options.slice(1)
      setOptions([...reduced, option])
    } else {
      setOptions((prev) => [...prev, option])
    }
  }

  return (
    <SnackBarContext.Provider value={{ addSnack }}>
      {children}
      <div className="fixed top-5 left-0 w-full z-snackbar">
        {options.map((option, i) => {
          return (
            <div key={`Snackbar-${i}`} className="flex items-center flex-col mb-4">
              <Snackbar type={option.type} message={option.message} />
            </div>
          )
        })}
      </div>
    </SnackBarContext.Provider>
  )
}
