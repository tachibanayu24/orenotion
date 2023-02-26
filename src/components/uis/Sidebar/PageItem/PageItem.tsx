import Link from 'next/link'
import { useState } from 'react'

import { PageRepository } from '@/repository/db/page/page.repository'

import { IconButton } from '@/components/uis/Icon/IconButton/IconButton'

import { Menu } from '../../Menu'
//

type PageType = {
  id: string
  emoji?: string
  title: string
}

type Props = {
  page: PageType
  childPages?: PageType[]
  onDelete: () => Promise<void>
}

const pageRepo = new PageRepository()

export const PageItem = ({ page, onDelete }: Props) => {
  const [isHover, setIsHover] = useState(false)
  const [isOpenedMenu, setIsOpenedMenu] = useState(false)

  const handleCopyLink = (pageId: string) => {
    console.log('copy', pageId)
  }

  const handleDelete = async (pageId: string) => {
    console.log('delete', pageId)
    await pageRepo.delete(pageId).then(async () => await onDelete())
  }

  // TODO: フルロードしてる
  return (
    <Link
      href={page.id}
      className="flex justify-between items-center py-1 px-2 text-base font-semibold rounded-lg hover:bg-slate-700"
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div>
        <span className="mr-1">{page.emoji}</span>
        <span>{page.title}</span>
      </div>

      {(isHover || isOpenedMenu) && (
        <div className="h-5">
          {/* <IconButton icon="plus" size="sm" onClick={console.log} /> */}
          <Menu
            options={[
              // { type: 'default', icon: 'plus', title: '追加', onClick: () => console.log('追加') },
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
                onClick: () => handleDelete(page.id),
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
