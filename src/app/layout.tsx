import 'tailwindcss/tailwind.css'
import '@/styles/global.css'

import { ReactNode } from 'react'

import { SWRConfig } from 'swr'

import { CurrentUserProvider, LayoutProvider, SnackbarProvider } from '@/components/providers'
import { ErrorBoundary } from '@/components/providers/ErrorBoundary'

import DefaultLayout from '@/layouts/DefaultLayout'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ErrorBoundary>
          <LayoutProvider>
            {/* <SWRConfig
              value={{
                revalidateOnFocus: false,
              }}
            > */}
            <CurrentUserProvider>
              <SnackbarProvider>
                <DefaultLayout>{children}</DefaultLayout>
              </SnackbarProvider>
            </CurrentUserProvider>
            {/* </SWRConfig> */}
          </LayoutProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
