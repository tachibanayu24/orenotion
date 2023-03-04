import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { signOut } from 'firebase/auth'

import { auth } from '@/config/firebase'

import { useCurrentUser, useLatestRelease, usePage, usePages } from '@/hooks'

import { Page, PAGE_CLASS } from '@/models/page/page'

import { PageItem } from './PageItem'
import { IconButton } from '../IconButton'
import { SignInForm } from '../SignInForm'
import { SidebarSkeleton } from '../Skeleton/SidebarSkeleton'
import { Tooltip } from '../Tooltip'

type Props = {
  isExpanded: boolean
  onToggle: () => void
}

type QueryType = {
  pageId: string
}

export const Sidebar = ({ isExpanded, onToggle }: Props) => {
  const router = useRouter()
  const { pageId } = router.query as QueryType

  const { pages, refetchPages } = usePages()
  const { addPage, deletePage } = usePage()
  const { currentUser } = useCurrentUser()
  const { version } = useLatestRelease()

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

  useEffect(() => {
    refetchPages()
  }, [refetchPages])

  if (isExpanded) {
    return (
      <aside className="w-[240px] h-[calc(100vh_-_8px)] lg:h-screen sticky top-0 z-front bg-slate-800 flex flex-col flex-shrink-0 justify-between p-2 shadow-xl rounded-3xl lg:rounded-none ml-1 my-1 lg:m-0">
        <div>
          <div className="flex justify-between mb-4">
            <div>
              <h1 className="text-lg text-center font-bold inline">
                <Link href="/">俺のNotion</Link>
              </h1>
              <span className="text-xs ml-2">{version || '...'}</span>
            </div>

            <Tooltip position="bottom-right" component="サイドバーを閉じる">
              <IconButton
                icon="anglesLeft"
                size="md"
                onClick={onToggle}
                className="text-slate-400"
              />
            </Tooltip>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="text-xs bold">Pages</span>
            <Tooltip position="top-right" component="ページを作成する">
              <IconButton icon="plus" size="sm" onClick={handleAddPage} />
            </Tooltip>
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
                    isActive={page.id === pageId}
                  />
                )
              })
          ) : (
            <SidebarSkeleton />
          )}
        </div>

        {currentUser?.isAdmin ? (
          <Tooltip
            position="top-right"
            shouldOpenOnClick
            component={
              <div className="w-60 flex flex-col gap-2 p-3">
                <button
                  onClick={() => {
                    signOut(auth)
                    router.reload()
                  }}
                  className={`p-1 rounded-full border border-green-400 text-sm shadow-md font-bold text-green-400`}
                >
                  ログアウト
                </button>
              </div>
            }
          >
            <div className="block bg-red-800 text-xs text-center -m-2 font-bold cursor-pointer rounded-b-3xl lg:rounded-none">
              Admin Mode
            </div>
          </Tooltip>
        ) : (
          <Tooltip position="top-right" shouldOpenOnClick component={<SignInForm />}>
            <div className="block bg-slate-700 text-xs text-center -m-2 cursor-pointer rounded-b-3xl lg:rounded-none">
              Admin Settings
            </div>
          </Tooltip>
        )}
      </aside>
    )
  } else {
    return (
      <aside className="sticky h-screen -mr-11 top-0 z-front p-2">
        <Tooltip position="bottom-right" component="サイドバーを開く">
          <IconButton
            icon="anglesRight"
            size="md"
            onClick={onToggle}
            className="text-slate-400 mt-0.5"
          />
        </Tooltip>
      </aside>
    )
  }
}
