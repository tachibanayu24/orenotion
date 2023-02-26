import Head from 'next/head'

import { Skeleton } from '@/components/uis/Skeleton'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl">Heading1</h1>
        <Skeleton variant="h1" />
        <h2 className="text-2xl">Heading2</h2>
        <Skeleton variant="h2" />
        <h3 className="text-xl">Heading1</h3>
        <Skeleton variant="h3" />
        <p className="text-lg">Paragraph</p>
        <Skeleton variant="p" />
        <p className="text-lg">Rect</p>
        <div className="w-1/2">
          <Skeleton variant="rectangle" size="sm" />
        </div>
        <p className="text-lg">Rect</p>
        <div className="w-1/2">
          <Skeleton variant="rectangle" size="md" />
        </div>
        <p className="text-lg">Rect</p>
        <div className="w-1/2">
          <Skeleton variant="rectangle" size="lg" />
        </div>
      </main>
    </>
  )
}
