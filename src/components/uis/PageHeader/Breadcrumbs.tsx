import Link from 'next/link'

import { usePages } from '@/hooks'

import { Page } from '@/models/page'

import { Icon } from '../Icon'

type Props = {
  page: Page
}

const Slash = () => <span className="text-xs font-semibold text-slate-600 mr-0.5">/</span>

export const Breadcrumbs = ({ page }: Props) => {
  const { pages } = usePages()

  const getPageList = (page: Page, pages: Page[]): Page[] => {
    const parent = page.getParent(pages)
    if (parent) {
      return [page, ...getPageList(parent, pages)].sort((a, b) => (a.layer > b.layer ? 1 : -1))
    } else {
      return [page].reverse()
    }
  }

  if (!pages) return <></>

  return (
    <div className="flex items-center gap-0.5 text-sm text-slate-200 whitespace-nowrap">
      <Link href="/" className="mr-1">
        <Icon icon="home" size="sm" />
      </Link>

      {getPageList(page, pages).map((page) => (
        <span key={`Breadcrumbs-${page.id}`} className="text-sm text-slate-200">
          <Slash />
          <Link href={page.id} className="p-0.5 rounded-md hover:bg-slate-600">
            {page.emoji} {page.title}
          </Link>
        </span>
      ))}
    </div>
  )
}
