import { Fragment } from 'react'

import { useCurrentUser, usePage, usePages } from '@/hooks'

import { Tooltip, IconButton, SidebarSkeleton } from '@/components/uis'

import { Page, PAGE_CLASS } from '@/models/page/page'

import { PageItem } from '../PageItem'

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
        pageClass: PAGE_CLASS.TIER3,
        publishedAt: null,
      })
    )
    refetchPages()
  }

  const getStructuredPages = (pages: Page[]) =>
    pages.map((p) => p.isPrimary() && p.nestChildren(pages)).filter((v): v is Page => Boolean(v))

  console.log(pages && getStructuredPages(pages))

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
