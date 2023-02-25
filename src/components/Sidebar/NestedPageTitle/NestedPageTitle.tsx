import Link from "next/link";

type PageType = {
  emoji?: string;
  title: string;
  url: string;
};

type Props = {
  page: PageType;
  childPages?: PageType[];
};

export const NestedPageTitle = ({ page, childPages }: Props) => {
  return (
    <Link
      href={page.url}
      className="block py-1 py-1 text-base font-bold rounded-lg hover:bg-slate-700"
    >
      <span className="mr-1">{page.emoji}</span>
      <span>{page.title}</span>
    </Link>
  );
};
