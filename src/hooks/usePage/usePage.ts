import { useCallback, useState } from 'react'

import { PageRepository } from '@/repository/db/page/page.repository'

import { Page } from '@/models/page'

const pageRepo = new PageRepository()

// TODO: 上限超えの調査用
export const usePage = () => {
  const [pages, setPages] = useState<Page[]>()

  const refetchPages = useCallback(async () => {
    console.log('refetch')
    await pageRepo
      .fetchAll()
      .then((res) => setPages(res))
      .catch((e) => console.error(new Error(e)))
  }, [])

  // TODO: DTO
  const addPage = useCallback(
    async (page: Parameters<PageRepository['add']>[number]) => {
      console.log('add')
      await pageRepo
        .add(page)
        .then(async () => await refetchPages())
        .catch((e) => console.error(e))
    },
    [refetchPages]
  )

  const deletePage = useCallback(
    async (pageId: string) => {
      console.log('delete')
      await pageRepo
        .delete(pageId)
        .then(async () => await refetchPages())
        .catch((e) => console.error(e))
    },
    [refetchPages]
  )

  return { pages, refetchPages, addPage, deletePage }
}
