import { Metadata } from 'next'

import { PageRepository } from '@/repository/db/page/page.repository'

import { Timeline } from '@/components/uis/Timeline'

export const metadata: Metadata = {
  title: '最近の更新',
  description: '俺Notionは、tachibanayu24のドキュメントです。',
}

async function fetchPages() {
  const pageRepo = new PageRepository()
  const pages = pageRepo.fetchAll({ publishedOnly: true, sortByOrder: false })

  return pages
}

export default async function Page() {
  const pages = await fetchPages()

  console.log(pages)

  return (
    <main className="px-4 lg:px-40 mt-1">
      <h1 className="text-base lg:text-2xl font-extrabold ml-2 lg:ml-0 mb-4">
        最近更新したドキュメント
      </h1>
      <Timeline pages={pages} isLoading={!(pages && pages.length > 0)} />
    </main>
  )
}
