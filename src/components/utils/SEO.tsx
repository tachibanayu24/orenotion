import { NextSeo } from 'next-seo'

type RequiredProps = {
  pagePath: string
  title?: string
  description?: string
  noindex?: boolean
}

type WebsiteProps = {
  type: 'website'
  publishedTime?: undefined
  modifiedTime?: undefined
  tags?: undefined
}

type ArticleProps = {
  type: 'article'
  publishedTime: string
  modifiedTime: string | undefined
  tags: string[]
}

type Props = RequiredProps & (WebsiteProps | ArticleProps)

export const SEO = ({
  type,
  pagePath,
  title,
  description,
  noindex,
  publishedTime,
  modifiedTime,
  tags,
}: Props) => {
  return (
    <NextSeo
      title={title}
      titleTemplate={`%s | 俺のNotion`}
      defaultTitle="俺のNotion"
      noindex={noindex}
      twitter={{
        cardType: 'summary',
        handle: `@tachibanayu24`,
      }}
      openGraph={{
        type: type,
        url: `https://doc.tachibanayu24${pagePath}`,
        title: title,
        description: description,
        site_name: '俺のNotion',
        // images: [
        //   {
        //     url: config.siteUrl + staticPath.images.ogimage_png,
        //     width: 1200,
        //     height: 630,
        //   },
        // ],
        article:
          type === 'article'
            ? {
                authors: [`https://twitter.com/tachibanayu24`],
                publishedTime: publishedTime,
                modifiedTime: modifiedTime,
                tags: tags,
              }
            : undefined,
      }}
    />
  )
}
