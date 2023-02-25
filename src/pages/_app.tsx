import type { AppProps } from 'next/app'

import { CurrentUserProvider } from '@/components/providers'

import DefaultLayout from '@/layouts/DefaultLayout'

import 'tailwindcss/tailwind.css'
import '@/styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CurrentUserProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </CurrentUserProvider>
  )
}
