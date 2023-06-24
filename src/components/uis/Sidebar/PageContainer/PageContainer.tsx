import { Fragment } from 'react'

import { useCurrentUser, usePage, usePages } from '@/hooks'

import { Page } from '@/models/page/page'

import { PageItem } from '../PageItem'

import { IconButton } from '../../IconButton'
import { SidebarSkeleton } from '../../Skeleton/SidebarSkeleton'
import { Tooltip } from '../../Tooltip'

type Props = {
  currentPageId: string
}

export const PageContainer = ({ currentPageId }: Props) => {
  const { currentUser } = useCurrentUser()

  const { pages, refetchPages } = usePages()
  const { addPage } = usePage()

  const handleAddPage = async () => {
    await addPage(
      Page.create({
        emoji: '📝',
        title: '',
        layer: 1,
        publishedAt: null,
      })
    )
    refetchPages()
  }

  const getStructuredPages = (pages: Page[]) =>
    pages.map((p) => p.isPrimary() && p.nestChildren(pages)).filter((v): v is Page => Boolean(v))

  const renderPageItemRecursive = (page: Page): JSX.Element => {
    return (
      <Fragment key={page.id}>
        <PageItem pageId={page.id} isActive={page.id === currentPageId} />
        {page.hasChildren() && page.children.map((child) => renderPageItemRecursive(child))}
      </Fragment>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs bold">Pages</span>
        {currentUser?.isAdmin && (
          <Tooltip position="top-right" component="ページを作成する">
            <IconButton icon="plus" size="sm" onClick={handleAddPage} />
          </Tooltip>
        )}
      </div>
      {pages ? (
        getStructuredPages(pages).map((page) => renderPageItemRecursive(page))
      ) : (
        <SidebarSkeleton />
      )}
    </div>
  )
}
