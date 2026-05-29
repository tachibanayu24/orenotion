'use client'

import { ReactNode } from 'react'

import { useLayout } from '@/hooks/useLayout'

import { Sidebar } from '@/components/uis'

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const { isExpandedSidebar, toggleSidebar } = useLayout()

  const expandedClass = (isExpanded: boolean) =>
    isExpanded
      ? `
w-screen lg:w-[calc(100vw_-_240px)]
ml-[-244px] lg:ml-auto`
      : 'w-screen'

  return (
    <div className="bg-slate-900 flex min-h-screen antialiased hover:subpixel-antialiased text-gray-200 ">
      <Sidebar isExpanded={isExpandedSidebar} onToggle={toggleSidebar} />

      <div>
        <main
          className={`${expandedClass(
            isExpandedSidebar
          )} min-h-[calc(100vh_-_30px)] grow py-2 px-4`}
        >
          {children}
        </main>
        <footer
          className={`${expandedClass(
            isExpandedSidebar
          )} h-[30px] text-xs flex justify-center items-center border-t border-slate-700 border-dashed left-0`}
        >
          Copyright by Yuto Tachibana
        </footer>
      </div>
    </div>
  )
}
