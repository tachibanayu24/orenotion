import { useRouter } from 'next/router'
import { ChangeEvent, ComponentProps, useCallback, useEffect, useMemo, useState } from 'react'

import { JSONContent } from '@tiptap/core'

import { debounce, getPageList, getPlaneTextFromJSONContent } from '@/utils'

import { useCurrentUser, usePage, usePages } from '@/hooks'

import { Editor, PageHeader, PageSkeleton } from '@/components/uis'
import { SEO } from '@/components/utils'

type QueryType = {
  pageId: string
}

// TODO: ここからsubscribeして、ページがないエラーをキャッチしたらrootに理レンダリングすればいい気がする
export default function PageDetail() {
  const router = useRouter()
  const { pages } = usePages()
  const { page, listenPage, fetchPage, updatePage } = usePage()
  const { currentUser } = useCurrentUser()

  const { pageId } = router.query as QueryType

  const [isUpdating, setIsUpdating] = useState(false)

  const content = useMemo(() => page?.content, [page?.content])

  // 変種モードではlistenしない
  useEffect(() => {
    if (currentUser?.isAdmin) {
      if (router.isReady) fetchPage(pageId)
    }
  }, [currentUser?.isAdmin, fetchPage, pageId, router.isReady])

  // 閲覧モードではlistenする
  useEffect(() => {
    if (!currentUser?.isAdmin) {
      const unsubscribe = router.isReady ? listenPage(pageId) : () => void 0
      return () => unsubscribe()
    }
  }, [currentUser?.isAdmin, listenPage, pageId, router.isReady])

  const handleUpdateEmoji = async (emoji: string) => {
    await updatePage(pageId, { emoji })
  }

  const handleUpdateTitle = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
    setIsUpdating(true)

    await updatePage(pageId, { title: e.target.value }, () =>
      setTimeout(() => {
        setIsUpdating(false)
      }, 500)
    )
  }, 1000)

  const handleUpdatePublishedAt = async (value: boolean) => {
    setIsUpdating(true)

    await updatePage(pageId, { publishedAt: value ? new Date() : null }, () => {
      setTimeout(() => {
        setIsUpdating(false)
      }, 500)
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUpdateContent = useCallback(
    debounce(async (json: JSONContent) => {
      setIsUpdating(true)
      await updatePage(pageId, { content: json }, () =>
        setTimeout(() => {
          setIsUpdating(false)
        }, 500)
      )
    }, 1000),
    [pageId, updatePage]
  )

  const handleSaveContent = useCallback(
    async (json: Parameters<ComponentProps<typeof Editor>['onUpdate']>[0]) => {
      setIsUpdating(true)
      await updatePage(pageId, { content: json }, () =>
        setTimeout(() => {
          setIsUpdating(false)
        }, 500)
      )
    },
    [pageId, updatePage]
  )

  // TODO: listenしているが初期読み込みのローディングは取れないのか？
  if (!page || !pages) return <PageSkeleton />

  return (
    <>
      <SEO
        type="article"
        pagePath={`/${page.id}`}
        title={`${page.emoji} ${page.title}`}
        description={
          page.content ? getPlaneTextFromJSONContent(page.content) : 'コンテンツがありません'
        }
        publishedTime={page.publishedAt?.toLocaleString() || ''}
        modifiedTime={page.updatedAt?.toLocaleString() || ''}
        tags={getPageList(page, pages).map((p) => p.title)}
      />

      <div>
        <PageHeader
          pages={pages}
          currentPage={page}
          currentUser={currentUser}
          onSelectEmoji={handleUpdateEmoji}
          onChangeTitle={handleUpdateTitle}
          onChangePublishedAt={handleUpdatePublishedAt}
          isUpdating={isUpdating}
        />

        <div className="pt-2" key="fixed">
          <Editor
            key="editorrr"
            onUpdate={handleUpdateContent}
            onSave={handleSaveContent}
            content={content}
            editable={Boolean(currentUser?.isAdmin)}
          />
        </div>
      </div>
    </>
  )
}
