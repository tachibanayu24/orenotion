import { Skeleton } from '../Skeleton'

const PageItemSkeleton = () => (
  <div className="flex gap-1 px-2 py-1">
    <div className="w-6 shrink-0">
      <Skeleton variant="p" />
    </div>
    <Skeleton variant="p" />
  </div>
)

export const SidebarSkeleton = () => {
  return (
    <div>
      <PageItemSkeleton />
      <PageItemSkeleton />
      <div className="ml-4">
        <PageItemSkeleton />
        <PageItemSkeleton />
      </div>
      <PageItemSkeleton />
      <PageItemSkeleton />
      <PageItemSkeleton />
    </div>
  )
}
