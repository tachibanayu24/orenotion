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
  const { addPage, deletePage } = usePage()

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

  const handleDeletePage = async (pageId: string) => {
    await deletePage(pageId)
    refetchPages()
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
        pages
          .filter((p) => p.isPrimary())
          .map((page) => {
            return (
              <PageItem
                key={page.id}
                pageId={page.id}
                onDelete={handleDeletePage}
                isActive={page.id === currentPageId}
              />
            )
          })
      ) : (
        <SidebarSkeleton />
      )}
    </div>
  )
}
