import Link from 'next/link'
import { useEffect, useState } from 'react'

import { usePage, usePages } from '@/hooks'

//
import { Page } from '@/models/page'

import { IconButton } from '../../IconButton'
import { Menu } from '../../Menu'

type Props = {
  pageId: Page['id']
  // childPages?: PageType[]
  onDelete: (id: string) => void
  isActive?: boolean
}

export const PageItem = ({ pageId, onDelete, isActive }: Props) => {
  const { pages } = usePages()
  const { page, listenPage } = usePage()
  const [isHover, setIsHover] = useState(false)
  const [isOpenedMenu, setIsOpenedMenu] = useState(false)

  const handleCopyLink = (pageId: string) => {
    console.log('copy', pageId)
  }

  useEffect(() => {
    const unsubscribe = listenPage(pageId)
    return () => unsubscribe()
  }, [listenPage, pageId])

  const renderItem = (page: Page, pages: Page[]) => {
    page.nestChildren(pages)

    return (
      <div
        className={`ml-${4 * (page.layer - 1)} ${
          isActive && 'bg-slate-700'
        } py-1 px-2 text-base font-semibold rounded-lg  hover:bg-slate-600`}
      >
        <Link
          href={page.id}
          className="flex justify-between items-center"
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="truncate">
            <span className="mr-1">{page.emoji}</span>
            <span className={page.title ? undefined : 'text-slate-400'}>
              {page.title || 'Untitled'}
            </span>
          </div>

          {(isHover || isOpenedMenu) && (
            <div className="h-5">
              {/* <IconButton icon="plus" size="sm" onClick={console.log} /> */}
              <Menu
                options={[
                  // { type: 'default', icon: 'plus', title: '追加/ onClick: () => console.log('追加') },
                  {
                    type: 'default',
                    icon: 'link',
                    title: 'リンクをコピー',
                    onClick: () => handleCopyLink(page.id),
                  },
                  // { type: 'default', icon: 'clone', title: '複製', onClick: () => console.log('複製') },
                  { type: 'divider' },
                  {
                    type: 'default',
                    icon: 'trash',
                    title: '削除',
                    onClick: () => onDelete(page.id),
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
        </Link>
      </div>
    )
  }

  if (!page || !pages) return <></>

  // TODO: フルロードしてる
  return (
    <>
      {renderItem(page, pages)}
      {page.hasChildren() && page.children.map((child) => renderItem(child, pages))}
    </>
  )
}
