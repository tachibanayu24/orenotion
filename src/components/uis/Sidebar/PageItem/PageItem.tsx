import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

import { useCurrentUser, usePage, usePages } from '@/hooks'
import { useClipboard } from '@/hooks/useClipboard'
import { useSnackbar } from '@/hooks/useSnackbar'

import { Page } from '@/models/page'

import { IconButton } from '../../IconButton'
import { Menu } from '../../Menu'
import { Tooltip } from '../../Tooltip'

type Props = {
  pageId: Page['id']
  isActive?: boolean
}

export const PageItem = ({ pageId, isActive }: Props) => {
  const { currentUser } = useCurrentUser()
  const { pages, refetchPages } = usePages()

  const {
    page, // listenしてリアルタイムアップデートするためにhooksから読み込む
    listenPage,
    updatePage,
    addPage,
    deletePage,
  } = usePage()
  const { addSnack } = useSnackbar()
  const { handleCopy } = useClipboard()

  const [isHover, setIsHover] = useState(false)
  const [isOpenedMenu, setIsOpenedMenu] = useState(false)

  const handleCopyLink = useCallback(
    (page: Page) => {
      handleCopy(`${location.host}/${page.id}`)
      addSnack({
        type: 'success',
        message: `${page.getTitle()} へのリンクをコピーしました`,
      })
    },
    [addSnack, handleCopy]
  )

  const handleDelete = useCallback(
    (page: Page) => {
      if (page.hasChildren()) {
        addSnack({
          type: 'failure',
          message: `子ページを持つページは削除できません\n先にすべての小ページを削除してください`,
        })
      } else {
        deletePage(page.id, pages).then(() => {
          addSnack({
            type: 'success',
            message: `${page.getTitle()} を削除しました`,
          })
          refetchPages()
        })
      }
    },
    [addSnack, deletePage, pages, refetchPages]
  )

  const handleAddPage = useCallback(
    async (parentPage: Page) => {
      const order = parentPage.childIds ? parentPage.childIds.length + 1 : 1
      const newPage = Page.create({
        emoji: '📝',
        title: '',
        layer: parentPage.layer + 1,
        order,
        publishedAt: null,
      })
      await updatePage(parentPage.id, {
        childIds: parentPage.childIds ? [...parentPage.childIds, newPage.id] : [newPage.id],
      })
      await addPage(newPage)
      refetchPages()

      addSnack({ type: 'success', message: `${parentPage.getTitle()} の子ページを作成しました` })
    },
    [addPage, addSnack, refetchPages, updatePage]
  )

  useEffect(() => {
    const unsubscribe = listenPage(pageId)
    return () => unsubscribe()
  }, [listenPage, pageId])

  if (!page || !pages) return <></>

  return (
    <div
      // NOTE: tailwindでやると何故か効かないので仕方なく
      style={{
        marginLeft: 12 * (page.layer - 1),
      }}
      className={`${isActive && 'bg-slate-700'} ${
        page.isPrimary() && 'mt-2'
      } py-1 px-2 text-sm rounded-lg  hover:bg-slate-600`}
    >
      <Link
        href={page.id}
        className="flex justify-between items-center"
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <p className={page.title ? 'truncate' : 'text-slate-400'}>{page.getTitle()}</p>

        <div className="flex items-center gap-1">
          {!page.publishedAt && (
            <Tooltip position="top-right" component="未公開のページ">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-2xl shrink-0" />
            </Tooltip>
          )}
          {(isHover || isOpenedMenu) && (
            <div className="h-5">
              <Menu
                options={[
                  {
                    type: 'default',
                    icon: 'link',
                    title: 'リンクをコピー',
                    onClick: () => handleCopyLink(page),
                  },
                  ...(currentUser?.isAdmin
                    ? [
                        {
                          type: 'default',
                          icon: 'plus',
                          title: '追加',
                          onClick: () => handleAddPage(page),
                        } as const,
                        { type: 'divider' } as const,
                        {
                          type: 'default',
                          icon: 'trash',
                          title: '削除',
                          onClick: () => handleDelete(page),
                          isDanger: true,
                        } as const,
                      ]
                    : []),
                ]}
                position="bottom-right"
                onOpen={() => setIsOpenedMenu(true)}
                onClose={() => {
                  setIsHover(false)
                  setIsOpenedMenu(false)
                }}
              >
                <IconButton icon="elipsis" size="sm" />
              </Menu>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}
