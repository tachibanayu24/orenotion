import { ReactNode, useEffect, useState } from 'react'

import { useLayout } from '@/hooks/useLayout'

import { Sidebar } from '@/components/uis'

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const { isExpandedSidebar, toggleSidebar } = useLayout()
  // TODO: 必要？
  const [loaded, setLoaded] = useState(false)

  const expandedClass = (isExpanded: boolean) =>
    isExpanded ? 'sm:w-screen lg:w-[calc(100vw_-_240px)] sm:-ml-[240px] lg:ml-auto' : 'w-screen'

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) return <></>

  return (
    <div className="flex min-h-screen antialiased hover:subpixel-antialiased text-gray-200 ">
      <Sidebar isExpanded={isExpandedSidebar} onToggle={toggleSidebar} />

      <div className="bg-slate-900">
        <main
          className={`${expandedClass(
            isExpandedSidebar
          )} min-h-[calc(100vh_-_30px)] grow py-2 px-4`}
        >
          {children}
        </main>
        <footer className="h-[30px] text-xs flex justify-center items-center border-t border-slate-700 border-dashed">
          Copyright by Yuto Tachibana
        </footer>
      </div>
    </div>
  )
}
