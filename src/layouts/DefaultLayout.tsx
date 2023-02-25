import { ReactNode } from 'react'

import { Sidebar } from '@/components/Sidebar'

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen antialiased hover:subpixel-antialiased text-gray-200 bg-slate-800">
      <Sidebar />

      <main className="w-[calc(100vw_-_240px)] grow p-20 bg-slate-900">{children}</main>
    </div>
  )
}
