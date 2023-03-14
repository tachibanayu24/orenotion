import Link from 'next/link'
import { Component, ReactNode } from 'react'

import { NotFoundError } from '@/models/__common__/error'

type Props = {
  children: ReactNode
}

type State = {
  error: Error | undefined
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: undefined }
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidMount() {
    window.addEventListener('unhandledrejection', this.onUnhandledRejection)
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.onUnhandledRejection)
  }

  onUnhandledRejection = (event: PromiseRejectionEvent) => {
    event.promise.catch((error: Error) => {
      this.setState(ErrorBoundary.getDerivedStateFromError(error))
    })
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.log('Unexpected error occurred!', error, errorInfo)
  }

  render(): ReactNode {
    const { children } = this.props
    const { error } = this.state

    // TODO: 他ののも追加
    // ホームに戻れない
    if (error) {
      if (error instanceof NotFoundError) {
        return (
          <main className="h-screen w-full flex flex-col justify-center items-center bg-slate-900">
            <h1 className="text-9xl font-extrabold text-white tracking-widest shadow-lg text-shadow-green-md select-none">
              404
            </h1>
            <div className="bg-green-600 px-2 text-sm rounded rotate-12 absolute select-none">
              Page Not Found
            </div>
            <button className="mt-5" onClick={() => (location.href = '/')}>
              <a className="relative inline-block text-sm font-medium text-green-600 group active:text-green-500 focus:outline-none focus:ring">
                <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-green-600 group-hover:translate-y-0 group-hover:translate-x-0" />
                <span className="relative block px-8 py-3 bg-slate-900 border border-current">
                  Home
                </span>
              </a>
            </button>
          </main>
        )
      } else {
        return (
          <main className="h-screen w-full flex flex-col justify-center items-center bg-slate-900">
            <h1 className="text-slate-200 mb-2 text-lg font-bold">エラーが発生しました 🙇‍♂️</h1>
            <p className="text-slate-200 mb-2">
              <Link
                href="https://github.com/tachibanayu24/orenotion/issues/new"
                target="_blank"
                className="text-blue-400"
              >
                Issue
              </Link>
              で報告していただけると大変ありがたいです。
            </p>
            <pre className="w-[60%] bg-slate-200 text-red-400 pb-6 px-4 rounded-md">
              <span className="block text-sm mb-2">Error occurred!</span>
              {error.message}
            </pre>
            <button className="mt-5" onClick={() => (location.href = '/')}>
              <a className="relative inline-block text-sm font-medium text-green-600 group active:text-green-500 focus:outline-none focus:ring">
                <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-green-600 group-hover:translate-y-0 group-hover:translate-x-0" />
                <span className="relative block px-8 py-3 bg-slate-900 border border-current">
                  Home
                </span>
              </a>
            </button>
          </main>
        )
      }
    }

    return children
  }
}
