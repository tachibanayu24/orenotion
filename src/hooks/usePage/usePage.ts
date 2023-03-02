import { useCallback, useState } from 'react'

import { PageRepository } from '@/repository/db/page/page.repository'

import { Page } from '@/models/page'

const pageRepo = new PageRepository()

export const usePage = () => {
  const [page, setPage] = useState<Page>()

  console.log(page?.title)

  const fetchPage = useCallback(async (id: string) => {
    console.log('get')
    await pageRepo.get(id).then((res) => setPage(res))
  }, [])

  // TODO: DTO
  const addPage = useCallback(async (page: Parameters<PageRepository['add']>[number]) => {
    console.log('add')
    await pageRepo.add(page).catch((e) => console.error(e))
  }, [])

  const updatePage = useCallback(
    async (id: string, updateObject: Partial<Page>, onUpdate?: () => void) => {
      return await pageRepo
        .update(id, { ...updateObject, updatedAt: new Date() })
        .then(onUpdate)
        .catch((e) => console.error(e))
    },
    []
  )

  const deletePage = useCallback(async (id: string) => {
    console.log('delete')
    await pageRepo.delete(id).catch((e) => console.error(e))
  }, [])

  const listenPage = useCallback(
    (id: string) => pageRepo.listen(id, async (page) => await fetchPage(page.id)),
    [fetchPage]
  )

  return { page, fetchPage, addPage, updatePage, deletePage, listenPage }
}
