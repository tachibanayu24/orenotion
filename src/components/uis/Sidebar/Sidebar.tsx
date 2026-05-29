'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { useLatestRelease } from '@/hooks'

import { PageContainer } from './PageContainer'
import { SignInContainer } from './SignInContainer'
import { IconButton } from '../IconButton'
import { Tooltip } from '../Tooltip'

type Props = {
  isExpanded: boolean
  onToggle: () => void
}

type QueryType = {
  pageId: string
}

export const Sidebar = ({ isExpanded, onToggle }: Props) => {
  // const router = useRouter()
  const pageId = 'usePathname()'
  // const search = useSearchParams()
  // console.log('pageId', pageId)
  // console.log('search', search.getAll)
  // const { pageId } = router.query as QueryType

  const { version } = useLatestRelease()

  if (isExpanded) {
    return (
      <aside className="w-[240px] h-[calc(100vh_-_16px)] lg:h-screen sticky top-0 z-front bg-slate-800 flex flex-col flex-shrink-0 justify-between p-2 shadow-xl rounded-3xl lg:rounded-none ml-1 my-2 lg:m-0">
        <div>
          <div className="flex justify-between mb-4">
            <div>
              <h1 className="text-lg text-center font-bold inline">
                <Link href="/">俺のNotion</Link>
              </h1>
              <span className="text-xs ml-2">{version || '...'}</span>
            </div>

            <Tooltip position="bottom-right" component="サイドバーを閉じる">
              <IconButton
                icon="anglesLeft"
                size="md"
                onClick={onToggle}
                className="text-slate-400"
              />
            </Tooltip>
          </div>

          <PageContainer currentPageId={pageId} />
        </div>

        <SignInContainer />
      </aside>
    )
  } else {
    return (
      <aside className="sticky h-screen -mr-11 top-0 z-front p-2">
        <Tooltip position="bottom-right" component="サイドバーを開く">
          <IconButton
            icon="anglesRight"
            size="md"
            onClick={onToggle}
            className="text-slate-400 mt-0.5"
          />
        </Tooltip>
      </aside>
    )
  }
}
