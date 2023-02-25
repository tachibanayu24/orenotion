import { useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { PageRepository } from '@/repository/db/page/page.repository'

type QueryType = {
  pageId: string
}

const pageRepo = new PageRepository()

export default function PageDetail() {
  const router = useRouter()
  const { pageId } = router.query as QueryType

  console.log(pageId)

  useEffect(() => {
    if (router.isReady) console.log(pageRepo.get(pageId))
  }, [pageId, router])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>timeline</main>
    </>
  )
}
