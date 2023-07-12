'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { PageRepository } from '@/repository/db/page/page.repository'

import { Page } from '@/models/page'

import { useSnackbar } from '../useSnackbar'

const pageRepo = new PageRepository()

export const usePage = () => {
  const router = useRouter()
  const { addSnack } = useSnackbar()
  const [page, setPage] = useState<Page>()

  const fetchPage = useCallback(async (id: string) => {
    await pageRepo.get(id).then((res) => setPage(res))
  }, [])

  // TODO: DTO
  const addPage = useCallback(async (page: Parameters<PageRepository['add']>[number]) => {
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

  const deletePage = useCallback(async (id: string, pages?: Page[]) => {
    const page = await pageRepo.get(id)

    await pageRepo.delete(id).catch((e) => console.error(e))

    // 小ページだった場合は、小ページ全てを削除して、親ベージのchildIdsから自信を取り出す
    // NOTE: 小ページを保つ場合は、めんどくさいので削除できないようになっている
    if (!page.isPrimary()) {
      if (!pages) return
      const parent = page.getParent(pages)
      if (parent) {
        await pageRepo.update(parent.id, {
          childIds: parent.childIds?.filter((id) => id !== page.id),
        })
      }
    }
  }, [])

  const listenPage = useCallback(
    (id: string) =>
      pageRepo.listen(
        id,
        async (page) => await fetchPage(page.id),
        (e) => {
          addSnack({ type: 'failure', message: e.message })
          setTimeout(() => {
            router.replace('/')
          }, 1000)
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchPage]
  )

  return { page, fetchPage, addPage, updatePage, deletePage, listenPage }
}
