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
    console.log(error)
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

    console.log('error', error)

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
            <button className="mt-5">
              <a className="relative inline-block text-sm font-medium text-green-600 group active:text-green-500 focus:outline-none focus:ring">
                <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-green-600 group-hover:translate-y-0 group-hover:translate-x-0" />

                <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                  <Link href="/">Home</Link>
                </span>
              </a>
            </button>
          </main>
        )
      } else {
        return (
          <main>
            <p>不明なエラーが発生しました</p>
          </main>
        )
      }
    }

    return children
  }
}
