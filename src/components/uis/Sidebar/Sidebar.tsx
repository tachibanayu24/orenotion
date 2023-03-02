import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { signOut } from 'firebase/auth'

import { auth } from '@/config/firebase'

import { useCurrentUser, usePage, usePages } from '@/hooks'

import { PAGE_CLASS } from '@/models/page/page'

import { PageItem } from './PageItem'
import { IconButton } from '../Icon/IconButton/IconButton'
import { SignInForm } from '../SignInForm'
import { SidebarSkeleton } from '../Skeleton/SidebarSkeleton'
import { Tooltip } from '../Tooltip'

export const Sidebar = () => {
  const router = useRouter()

  const { pages, refetchPages } = usePages()
  const { addPage, deletePage, unsubscribePage } = usePage()
  const { currentUser } = useCurrentUser()

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
    <aside className="w-[240px] h-screen sticky top-0 z-front flex flex-col justify-between p-2 bg-slate-800 shadow-xl">
      <div>
        <h1 className="text-lg mb-4 text-center font-bold">
          <Link href="/">俺のNotion</Link>
        </h1>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs bold">Pages</span>
          <IconButton icon="plus" size="sm" onClick={handleAddPage} />
        </div>
        {/* // TODO:  */}
        {pages ? (
          pages.map((page) => (
            <PageItem
              key={page.id}
              page={page}
              onDelete={handleDeletePage}
              unsubscribe={unsubscribePage}
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
                className={`p-1 rounded-full border border-sky-400 text-sm shadow-md font-bold text-sky-400`}
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
