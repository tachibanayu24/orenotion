import { useCallback, useEffect, useState } from 'react'

import { PageRepository } from '@/repository/db/page/page.repository'

import { Page } from '@/models/page'

import { useCurrentUser } from '../useCurrentUser'

const pageRepo = new PageRepository()

export const usePages = () => {
  const [pages, setPages] = useState<Page[]>()
  const { currentUser } = useCurrentUser()

  const refetchPages = useCallback(async () => {
    await pageRepo
      .fetchAll({ publishedOnly: !currentUser?.isAdmin })
      .then((res) => setPages(res))
      .catch((e) => console.error(new Error(e)))
  }, [currentUser?.isAdmin])

  useEffect(() => {
    refetchPages()
  }, [refetchPages])

  return { pages, refetchPages }
}
