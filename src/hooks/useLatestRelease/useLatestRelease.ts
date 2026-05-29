'use client'

import useSWR from 'swr'

type Release = Record<string, string> & { tag_name: string }

export const useLatestRelease = () => {
  const { data, isLoading } = useSWR<Release>(
    'https://api.github.com/repos/tachibanayu24/orenotion/releases/latest',
    (url) => fetch(url).then((res) => res.json())
  )

  return { version: data?.tag_name, isLoading }
}
