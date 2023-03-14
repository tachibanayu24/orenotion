import Link from 'next/link'

import { getPageList } from '@/utils'

import { Page } from '@/models/page'

import { Icon } from '../Icon'

type Props = {
  currentPage: Page
  pages: Page[]
}

const Slash = () => <span className="text-xs font-semibold text-slate-600 mr-0.5">/</span>

export const Breadcrumbs = ({ currentPage, pages }: Props) => {
  if (!pages) return <></>

  // TODO: モバイルのときパンくずはroot directoryだけ表示で切れいれば良いのでelipsisする
  return (
    <div className="flex items-center gap-0.5 text-sm text-slate-200 whitespace-nowrap truncate">
      <Link href="/" className="mr-1">
        <Icon icon="home" size="sm" />
      </Link>

      {getPageList(currentPage, pages).map((page) => {
        const title = page.getTitle()
        return (
          <span key={`Breadcrumbs-${page.id}`} className="text-sm text-slate-200">
            <Slash />
            <Link href={page.id} className="p-0.5 rounded-md hover:bg-slate-600">
              {title.length > 10 ? `${title.substring(0, 10)}...` : title}
            </Link>
          </span>
        )
      })}
    </div>
  )
}
