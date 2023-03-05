import Link from 'next/link'
import { Fragment, useCallback, useEffect, useState } from 'react'

import { usePage, usePages } from '@/hooks'
import { useClipboard } from '@/hooks/useClipboard'
import { useSnackbar } from '@/hooks/useSnackbar'

import { Page } from '@/models/page'

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
  const { pages } = usePages()
  const { page, listenPage } = usePage()
  const { addSnack } = useSnackbar()
  const { handleCopy } = useClipboard()

  const [isHover, setIsHover] = useState(false)
  const [isOpenedMenu, setIsOpenedMenu] = useState(false)

  const handleCopyLink = useCallback(
    (page: Page) => {
      handleCopy(`${location.host}/${page.id}`)
      addSnack({
        type: 'success',
        message: `${page.emoji} ${page.title || 'Untitled'} へのリンクをコピーしました`,
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
            message: `${page.emoji} ${page.title || 'Untitled'} を削除しました`,
          })
        )
      }
    },
    [addSnack, onDelete]
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
                {nested.title || 'Untitled'}
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
                        icon: 'plus',
                        title: '追加',
                        onClick: () => console.log('追加'),
                      },
                      {
                        type: 'default',
                        icon: 'link',
                        title: 'リンクをコピー',
                        onClick: () => handleCopyLink(nested),
                      },
                      // { type: 'default', icon: 'clone', title: '複製', onClick: () => console.log('複製') },
                      { type: 'divider' },
                      {
                        type: 'default',
                        icon: 'trash',
                        title: '削除',
                        onClick: () => handleDelete(nested),
                        isDanger: true,
                      },
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
