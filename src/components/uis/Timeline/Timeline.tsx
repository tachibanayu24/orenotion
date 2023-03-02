import { Page } from '@/models/page'

import { TimelineListItem } from './TimelineListItem'

type Props = {
  pages: Page[] | undefined
  isLoading: boolean
}

export const Timeline = ({ pages, isLoading }: Props) => {
  return (
    <ol className="relative border-l border-green-300">
      {!isLoading &&
        pages.map((page) => <TimelineListItem key={`TimelineListItem-${page.id}`} page={page} />)}
    </ol>
  )
}
