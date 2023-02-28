import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Unsubscribe } from 'firebase/auth'

import { IconButton } from '@/components/uis/Icon/IconButton/IconButton'

import { Page } from '@/models/page'

import { Menu } from '../../Menu'

type Props = {
  page: Page
  // childPages?: PageType[]
  onDelete: (id: string) => void
  unsubscribe: (id: string) => Unsubscribe
}

export const PageItem = ({ page, onDelete, unsubscribe }: Props) => {
  const [isHover, setIsHover] = useState(false)
  const [isOpenedMenu, setIsOpenedMenu] = useState(false)

  const handleCopyLink = (pageId: string) => {
    console.log('copy', pageId)
  }

  useEffect(() => {
    const unsub = unsubscribe(page.id)
    return () => unsub()
  }, [page, unsubscribe])

  if (!page) return <></>

  // TODO: フルロードしてる
  return (
    <Link
      href={page.id}
      className="flex justify-between items-center py-1 px-2 text-base font-semibold rounded-lg hover:bg-slate-700"
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
  )
}
