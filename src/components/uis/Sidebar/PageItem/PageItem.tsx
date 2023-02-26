import Link from 'next/link'
import { useState } from 'react'

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
}

export const PageItem = ({ page }: Props) => {
  const [isHover, setIsHover] = useState(false)
  const [isOpenedMenu, setIsOpenedMenu] = useState(false)

  // TODO: フルロードしてる
  return (
    <Link
      href={page.id}
      className="flex justify-between items-center p-1 px-2 text-base font-bold rounded-lg hover:bg-slate-700"
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div>
        <span className="mr-1">{page.emoji}</span>
        <span>{page.title}</span>
      </div>

      {(isHover || isOpenedMenu) && (
        <div className="flex items-center">
          {/* <IconButton icon="plus" size="sm" onClick={console.log} /> */}
          <Menu
            options={[
              { icon: 'plus', title: '削除', onClick: console.log },
              { icon: 'plus', title: 'ページを複製', onClick: console.log },
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
