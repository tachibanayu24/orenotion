import { useCallback, useEffect, useState } from 'react'

import { PageRepository } from '@/repository/db/page/page.repository'

import { Page } from '@/models/page'

const pageRepo = new PageRepository()

export const usePages = () => {
  const [pages, setPages] = useState<Page[]>()

  const refetchPages = useCallback(async () => {
    console.log('refetch')
    await pageRepo
      .fetchAll()
      .then((res) => setPages(res))
      .catch((e) => console.error(new Error(e)))
  }, [])

  useEffect(() => {
    refetchPages()
  }, [refetchPages])

  return { pages, refetchPages }
}
