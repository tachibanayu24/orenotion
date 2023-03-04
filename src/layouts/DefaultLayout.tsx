import { ReactNode } from 'react'

import { useLocalStorage } from '@/hooks'

import { Sidebar } from '@/components/uis'

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const { storedValue: isSidebarExpanded, setValue: setIsSidebarExpanded } = useLocalStorage(
    'is-sidebar-expanded',
    true
  )

  console.log(isSidebarExpanded)

  return (
    <div className="flex min-h-screen antialiased hover:subpixel-antialiased text-gray-200 ">
      <Sidebar
        isExpanded={isSidebarExpanded}
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
      />

      <div className="bg-slate-900">
        <main
          className={`w-[calc(100vw_-_${
            isSidebarExpanded ? '240px' : '0px'
          })] min-h-[calc(100vh_-_30px)] grow py-2 px-4`}
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
