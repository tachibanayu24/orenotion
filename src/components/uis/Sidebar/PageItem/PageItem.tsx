import Link from 'next/link'
import { Fragment, useCallback, useEffect, useState } from 'react'

import { useCurrentUser, usePage, usePages } from '@/hooks'
import { useClipboard } from '@/hooks/useClipboard'
import { useSnackbar } from '@/hooks/useSnackbar'

import { Page } from '@/models/page'
import { PAGE_CLASS } from '@/models/page/page'

import { IconButton } from '../../IconButton'
import { Menu } from '../../Menu'
import { Tooltip } from '../../Tooltip'

type Props = {
  pageId: Page['id']
  // childPages?: PageType[]
  onDelete: (id: string) => Promise<void>
  isActive?: boolean
}

export const PageItem = ({ pageId, onDelete, isActive }: Props) => {
  const { currentUser } = useCurrentUser()
  const { pages } = usePages()
  const { page, listenPage, updatePage, addPage } = usePage()
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
        onDelete(page.id).then(() =>
          addSnack({
            type: 'success',
            message: `${page.getTitle()} を削除しました`,
          })
        )
      }
    },
    [addSnack, onDelete]
  )

  const handleAddPage = useCallback(
    async (parentPage: Page) => {
      const newPage = Page.create({
        emoji: '📝',
        title: '',
        layer: parentPage.layer + 1,
        pageClass: PAGE_CLASS.TIER3,
        publishedAt: null,
      })
      await updatePage(parentPage.id, {
        childIds: parentPage.childIds ? [...parentPage.childIds, newPage.id] : [newPage.id],
      })
      await addPage(newPage)

      addSnack({ type: 'success', message: `${parentPage.getTitle()} の子ページを作成しました` })
    },
    [addPage, addSnack, updatePage]
  )

  useEffect(() => {
    const unsubscribe = listenPage(pageId)
    return () => unsubscribe()
  }, [listenPage, pageId])

  const renderItem = (page: Page, pages: Page[]): JSX.Element => {
    const nested = page.nestChildren(pages)

    return (
      <Fragment key={`PageItem-${page.id}`}>
        <div
          // NOTE: tailwindでやると何故か効かないので仕方なく
          style={{
            marginLeft: 12 * (nested.layer - 1),
          }}
          className={`${
            isActive && 'bg-slate-700'
          } py-1 px-2 text-base font-semibold rounded-lg  hover:bg-slate-600`}
        >
          <Link
            href={nested.id}
            className="flex justify-between items-center"
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <div className="truncate flex items-center">
              <span className="mr-1">{nested.emoji}</span>
              <span className={nested.title ? undefined : 'text-slate-400'}>
                {nested.getTitle({ withEmoji: false })}
              </span>
            </div>

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
                        onClick: () => handleCopyLink(nested),
                      },
                      // { type: 'default', icon: 'clone', title: '複製', onClick: () => console.log('複製') },
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
                              onClick: () => handleDelete(nested),
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
        {nested.hasChildren() && nested.children.map((child) => renderItem(child, pages))}
      </Fragment>
    )
  }

  if (!page || !pages) return <></>

  return renderItem(page, pages)
}
