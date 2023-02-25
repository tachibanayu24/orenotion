import Link from 'next/link'

type PageType = {
  id: string
  emoji?: string
  title: string
}

type Props = {
  page: PageType
  childPages?: PageType[]
}

export const NestedPageTitle = ({ page }: Props) => {
  // TODO: フルロードしてる
  return (
    <Link href={page.id} className="block p-1 text-base font-bold rounded-lg hover:bg-slate-700">
      <span className="mr-1">{page.emoji}</span>
      <span>{page.title}</span>
    </Link>
  )
}
