import { Skeleton } from '.'

export const PageSkeleton = () => {
  return (
    <div>
      <div className="sticky top-0 bg-slate-900 z-floating -mt-4 pt-4">
        <div className="flex justify-between items-center">
          <Skeleton variant="p" />
        </div>

        <div className="px-2 py-4">
          <div className="flex items-center justify-center gap-1 text-3xl mb-2">
            <div className="w-11 h-11 flex items-center justify-center">
              <Skeleton variant="h1" />
            </div>
            <Skeleton variant="h1" />
          </div>
          <div className="text-xs text-slate-300 flex justify-start gap-4">
            <div className="w-60">
              <Skeleton variant="p" width="w-60" />
            </div>
            <div className="w-60">
              <Skeleton variant="p" />
            </div>
          </div>
        </div>

        <hr className="border-slate-500 mt-2" />
      </div>

      <div className="pt-2 flex flex-col gap-4">
        <Skeleton variant="h1" width="w-[50%]" />
        <Skeleton variant="h2" width="w-[70%]" />
        <Skeleton variant="p" width="w-[100%]" />
        <Skeleton variant="p" width="w-[90%]" />
        <Skeleton variant="rectangle" size="lg" />
        <div className="h-10" />
        <Skeleton variant="h2" width="w-[70%]" />
        <Skeleton variant="p" width="w-[90%]" />
        <Skeleton variant="p" width="w-[90%]" />
      </div>
    </div>
  )
}
