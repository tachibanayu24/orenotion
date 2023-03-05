import 'tailwindcss/tailwind.css'
import '@/styles/global.css'

import type { AppProps } from 'next/app'

import { SWRConfig } from 'swr'

import { CurrentUserProvider, LayoutProvider, SnackbarProvider } from '@/components/providers'
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
            <SnackbarProvider>
              <DefaultLayout>
                <Component {...pageProps} />
              </DefaultLayout>
            </SnackbarProvider>
          </CurrentUserProvider>
        </SWRConfig>
      </LayoutProvider>
    </ErrorBoundary>
  )
}
