// 'use client'

import { useRouter } from 'next/router'
import { ChangeEvent, ComponentProps, useCallback, useEffect, useMemo, useState } from 'react'

import { JSONContent } from '@tiptap/core'

import { debounce, getPlaneTextFromJSONContent } from '@/utils'

import { PageRepository } from '@/repository/db/page/page.repository'

import { useCurrentUser, usePage, usePages } from '@/hooks'

import { Editor, PageHeader, PageSkeleton } from '@/components/uis'
import { SEO } from '@/components/utils'

import { Page } from '@/models/page'
import { User } from '@/models/user'

type QueryType = {
  pageId: string
}

async function getPage(pageId: string) {
  const pageRepo = new PageRepository()

  const page = await pageRepo.get(pageId)

  return page
}

async function getPages() {
  const pageRepo = new PageRepository()

  // TODO: publishedOnly: falseで認証してからリクエスト
  const pages = await pageRepo.fetchAll({ publishedOnly: true, sortByOrder: false })

  return pages
}

// TODO: ここからsubscribeして、ページがないエラーをキャッチしたらrootにリレンダリングすればいい気がする
// TODO: getLayout
// @see https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#migrating-the-getlayout-pattern-to-layouts-optional
export default async function PageDetail() {
  const initialPage = await getPage('QzK4pk')
  const pages = await getPages()

  // const router = useRouter()
  // const { pages } = usePages()
  // const { page, listenPage, fetchPage, updatePage } = usePage()
  // const { currentUser } = useCurrentUser()

  // const { pageId } = router.query as QueryType

  // const [isUpdating, setIsUpdating] = useState(false)

  // const content = useMemo(() => page?.content, [page?.content])

  // 変種モードではlistenしない
  // useEffect(() => {
  //   if (currentUser?.isAdmin) {
  //     if (router.isReady) fetchPage(pageId)
  //   }
  // }, [currentUser?.isAdmin, fetchPage, pageId, router.isReady])

  // 閲覧モードではlistenする
  // useEffect(() => {
  //   if (!currentUser?.isAdmin) {
  //     const unsubscribe = router.isReady ? listenPage(pageId) : () => void 0
  //     return () => unsubscribe()
  //   }
  // }, [currentUser?.isAdmin, listenPage, pageId, router.isReady])

  const handleUpdateEmoji = async (emoji: string) => {
    // await updatePage(pageId, { emoji })
  }

  const handleUpdateTitle = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
    // setIsUpdating(true)
    // await updatePage(pageId, { title: e.target.value }, () =>
    //   setTimeout(() => {
    //     setIsUpdating(false)
    //   }, 500)
    // )
  }, 1000)

  const handleUpdatePublishedAt = async (value: boolean) => {
    // setIsUpdating(true)
    // await updatePage(pageId, { publishedAt: value ? new Date() : null }, () => {
    //   setTimeout(() => {
    //     setIsUpdating(false)
    //   }, 500)
    // })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUpdateContent = debounce(async (json: JSONContent) => {
    // setIsUpdating(true)
    // await updatePage(pageId, { content: json }, () =>
    //   setTimeout(() => {
    //     setIsUpdating(false)
    //   }, 500)
    // )
  }, 1000)

  const handleSaveContent = async (
    json: Parameters<ComponentProps<typeof Editor>['onUpdate']>[0]
  ) => {
    // setIsUpdating(true)
    // await updatePage(pageId, { content: json }, () =>
    //   setTimeout(() => {
    //     setIsUpdating(false)
    //   }, 500)
    // )
  }

  return (
    <>
      <SEO
        type="article"
        pagePath={`/${initialPage.id}`}
        title={initialPage.title}
        description={
          initialPage.content
            ? getPlaneTextFromJSONContent(initialPage.content, 400)
            : 'コンテンツがありません'
        }
        publishedTime={initialPage.toJson().publishedAt}
        modifiedTime={initialPage.toJson().updatedAt}
        tags={[initialPage.title]}
        noindex={!initialPage.publishedAt}
      />

      <div>
        <PageHeader
          pages={pages}
          currentPage={initialPage}
          // currentUser={currentUser}
          currentUser={User.create({ isAdmin: true, createdAt: new Date() })}
          // onSelectEmoji={handleUpdateEmoji}
          // onChangeTitle={handleUpdateTitle}
          // onChangePublishedAt={handleUpdatePublishedAt}
          // isUpdating={isUpdating}
          isUpdating={false}
        />

        <div className="pt-2" key="fixed">
          <Editor
            // onUpdate={handleUpdateContent}
            // onSave={handleSaveContent}
            content={initialPage.content}
            // editable={Boolean(currentUser?.isAdmin)}
            editable={true}
          />
        </div>
      </div>
    </>
  )
}

// export async function getServerSideProps({ query }: { query: QueryType }) {
//   const pageRepo = new PageRepository()
//   try {
//     const page = (await pageRepo.get(query.pageId)).toJson()

//     return { props: { initialPage: page } }
//   } catch (e) {
//     console.warn(e)
//     return { props: { initialPage: {} } }
//   }
// }
