import { useContext } from 'react'

import { LayoutContext } from '@/components/providers'

export const useLayout = () => {
  const { isExpandedSidebar, toggleSidebar } = useContext(LayoutContext)

  return { isExpandedSidebar, toggleSidebar }
}
