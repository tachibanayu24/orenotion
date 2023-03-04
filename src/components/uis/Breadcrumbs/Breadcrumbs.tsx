import { usePages } from '@/hooks'

import { Page } from '@/models/page'

import { Icon } from '../Icon'

type Props = {
  page: Page
}

export const Breadcrumbs = ({ page }: Props) => {
  const { pages } = usePages()

  const getPageList = (page: Page, pages: Page[]): Page[] => {
    const parent = page.getParent(pages)
    if (parent) {
      return [page, ...getPageList(parent, pages)]
    } else {
      return [page].reverse()
    }
  }

  if (!pages) return <></>

  console.log(getPageList(page, pages))

  return (
    <div className="flex items-center gap-2 text-sm text-slate-200">
      <Icon icon="home" size="sm" />
      <span className="text-xs text-slate-400">/</span>
      {/* {renderBreadCrumbs(page, pages)} */}
    </div>
  )
}
