import { createContext, ReactNode, useEffect, useState } from 'react'

import { useLocalStorage } from '@/hooks/useLocalStorage'

export const LayoutContext = createContext<{
  isExpandedSidebar: boolean
  toggleSidebar: () => void
}>({
  isExpandedSidebar: false,
  toggleSidebar: () => void 0,
})

type Props = {
  children: ReactNode
}

export const LayoutProvider = ({ children }: Props) => {
  const { storedValue: isSidebarExpanded, setValue: setIsSidebarExpanded } = useLocalStorage(
    'is-sidebar-expanded',
    true
  )

  const [isExpandedSidebar, setIsExpandedSidebar] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isExpandedSidebar)
  }

  useEffect(() => {
    setIsExpandedSidebar(isSidebarExpanded)
  }, [isSidebarExpanded])

  return (
    <LayoutContext.Provider value={{ isExpandedSidebar, toggleSidebar }}>
      {children}
    </LayoutContext.Provider>
  )
}
