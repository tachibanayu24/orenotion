import { useEffect, useState } from 'react'

import Link from 'next/link'

import { PageRepository } from '@/repository/db/page/page.repository'

import { IconButton } from '../IconButton/IconButton'

import { PageItem } from './PageItem'

const pageRepo = new PageRepository()

export const Sidebar = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pages, setPages] = useState<any>()

  const loadPages = async () => {
    await pageRepo.fetchAll().then((res) => setPages(res))
  }

  const addPage = async () => {
    await pageRepo.add({ emoji: '🚀', title: '宇宙旅行', content: { hoge: 'hoge', fuga: 123 } })
  }

  useEffect(() => {
    loadPages()
  }, [])

  console.log(pages)

  if (!pages) {
    return <p>Loading...</p>
  } else {
    return (
      <aside className="w-[240px] flex flex-col justify-between py-1 px-2 bg-slate-800 shadow-xl">
        <div>
          <div className="mb-4">
            <h1 className="text-lg text-center font-bold">俺のNotion</h1>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs bold">Pages</span>
            <IconButton icon="plus" size="sm" onClick={addPage} />
          </div>

          {/* // TODO:  */}
          {pages.map((page: { id: string; emoji?: string | undefined; title: string }) => (
            <PageItem key={page.id} page={page} />
          ))}
        </div>

        <Link href="/signin" className="block bg-slate-700 text-xs text-center -my-1 -mx-2">
          Admin Settings
        </Link>
      </aside>
    )
  }
}
