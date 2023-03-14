import { usePages } from '@/hooks'

import { Timeline } from '@/components/uis/Timeline'
import { SEO } from '@/components/utils'

export default function Home() {
  const { pages } = usePages()

  return (
    <>
      <SEO
        type="website"
        pagePath="/"
        title="最近の更新"
        description="tachibanayu24のドキュメント"
      />

      <main className="px-4 lg:px-60 mt-1">
        <h1 className="text-base lg:text-2xl font-extrabold ml-2 lg:ml-0 mb-4">
          最近更新したドキュメント
        </h1>
        <Timeline pages={pages} isLoading={!(pages && pages.length > 0)} />
      </main>
    </>
  )
}
