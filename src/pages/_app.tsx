import 'tailwindcss/tailwind.css'
import '@/styles/global.css'

import type { AppProps } from 'next/app'

import { CurrentUserProvider } from '@/components/providers'
import { ErrorBoundary } from '@/components/providers/ErrorBoundary'

import DefaultLayout from '@/layouts/DefaultLayout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <CurrentUserProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </CurrentUserProvider>
    </ErrorBoundary>
  )
}
