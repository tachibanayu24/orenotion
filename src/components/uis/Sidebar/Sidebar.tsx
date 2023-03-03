import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { signOut } from 'firebase/auth'

import { auth } from '@/config/firebase'

import { useCurrentUser, useLatestRelease, usePage, usePages } from '@/hooks'

import { PAGE_CLASS } from '@/models/page/page'

import { PageItem } from './PageItem'
import { IconButton } from '../IconButton'
import { SignInForm } from '../SignInForm'
import { SidebarSkeleton } from '../Skeleton/SidebarSkeleton'
import { Tooltip } from '../Tooltip'

type QueryType = {
  pageId: string
}

export const Sidebar = () => {
  const router = useRouter()
  const { pageId } = router.query as QueryType

  const { pages, refetchPages } = usePages()
  const { addPage, deletePage } = usePage()
  const { currentUser } = useCurrentUser()
  const { version } = useLatestRelease()

  const handleAddPage = async () => {
    await addPage({ emoji: '📝', title: '', pageClass: PAGE_CLASS.TIER3, publishedAt: null })
    refetchPages()
  }

  const handleDeletePage = async (pageId: string) => {
    await deletePage(pageId)
    refetchPages()
  }

  useEffect(() => {
    refetchPages()
  }, [refetchPages])

  return (
    <aside className="w-[240px] h-screen sticky top-0 z-front bg-slate-800 flex flex-col justify-between p-2 shadow-xl">
      <div>
        <div className="text-center">
          <h1 className="text-lg mb-4 text-center font-bold inline">
            <Link href="/">俺のNotion</Link>
          </h1>
          <span className="text-xs ml-2">{version || '...'}</span>
        </div>

        <div className="flex justify-between items-center mb-2">
          <span className="text-xs bold">Pages</span>
          <IconButton icon="plus" size="sm" onClick={handleAddPage} />
        </div>
        {pages ? (
          pages.map((page) => (
            <PageItem
              key={page.id}
              pageId={page.id}
              onDelete={handleDeletePage}
              isActive={page.id === pageId}
            />
          ))
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
          <div className="block bg-red-800 text-xs text-center -m-2 font-bold cursor-pointer">
            Admin Mode
          </div>
        </Tooltip>
      ) : (
        <Tooltip position="top-right" shouldOpenOnClick component={<SignInForm />}>
          <div className="block bg-slate-700 text-xs text-center -m-2 cursor-pointer">
            Admin Settings
          </div>
        </Tooltip>
      )}
    </aside>
  )
}
