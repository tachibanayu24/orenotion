import 'tailwindcss/tailwind.css'
import '@/styles/global.css'

import type { AppProps } from 'next/app'

import { SWRConfig } from 'swr'

import { CurrentUserProvider, LayoutProvider } from '@/components/providers'
import { ErrorBoundary } from '@/components/providers/ErrorBoundary'

import DefaultLayout from '@/layouts/DefaultLayout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <LayoutProvider>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
          }}
        >
          <CurrentUserProvider>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </CurrentUserProvider>
        </SWRConfig>
      </LayoutProvider>
    </ErrorBoundary>
  )
}
