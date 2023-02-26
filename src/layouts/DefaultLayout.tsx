import { ReactNode } from 'react'

import { Sidebar } from '@/components/uis/Sidebar'

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen antialiased hover:subpixel-antialiased text-gray-200 bg-slate-800">
      <Sidebar />

      <div className=" bg-slate-900">
        <main className="w-[calc(100vw_-_240px)] min-h-[calc(100vh_-_30px)] grow p-4">
          {children}
        </main>
        <footer className="h-[30px] text-xs flex justify-center items-center border-t border-slate-700 border-dashed">
          Copyright by Yuto Tachibana
        </footer>
      </div>
    </div>
  )
}
