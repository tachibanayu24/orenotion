import { Page } from '@/models/page'

export const getPageList = (currentPage: Page, pages: Page[]): Page[] => {
  const results: Page[] = [currentPage]

  const parent = currentPage.getParent(pages)
  if (parent) {
    results.unshift(...getPageList(parent, pages))
  }

  return results
}
