import Link from 'next/link'

import { format } from 'date-fns'

import { getPlaneTextFromJSONContent } from '@/utils'

import { Page } from '@/models/page'

type Props = {
  page: Page
}

export const TimelineListItem = ({ page }: Props) => {
  return (
    <li className="my-4 ml-4">
      <div className="absolute w-3 h-3 bg-green-500 rounded-full mt-1.5 -left-1.5"></div>
      <time className="mb-1 text-sm leading-none text-slate-400">
        {page.publishedAt ? format(page.publishedAt, 'yyyy/MM/dd HH:mm') : '非'} 公開
      </time>
      <Link
        href={page.id}
        className="block w-full rounded-md border border-slate-400 hover:opacity-80 shadow-md py-6 px-4 mt-2"
      >
        <h2 className="text-lg font-bold">{page.getTitle()}</h2>
        <p className="line-clamp-3 text-sm text-slate-300">
          {page.content && getPlaneTextFromJSONContent(page.content)}
        </p>
      </Link>
    </li>
  )
}
