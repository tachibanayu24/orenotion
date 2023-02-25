import Link from 'next/link'
import { useState } from 'react'

import { IconButton } from '@/components/IconButton/IconButton'

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

      {isHover && (
        <div className="flex items-center">
          <IconButton icon="plus" size="sm" onClick={console.log} />
        </div>
      )}
    </Link>
  )
}
