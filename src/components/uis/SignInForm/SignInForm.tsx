import { useRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'

import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '@/config/firebase'

type FormType = {
  email: { value: string }
  password: { value: string }
}

type Props = {
  onAuthenticated?: () => void
}

export const SignInForm = ({ onAuthenticated }: Props) => {
  const router = useRouter()

  const [isError, setIsError] = useState(false)

  const handleSignIn = (e: SyntheticEvent) => {
    e.preventDefault()

    const target = e.target as EventTarget & FormType

    const email = target.email.value
    const password = target.password.value

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        onAuthenticated && onAuthenticated()
        router.reload()
      })
      .catch(() => {
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 1000)
      })
  }

  return (
    <form onSubmit={handleSignIn} className="w-80 flex flex-col gap-2 p-3">
      <span className="text-sm font-bold mb-1">管理者ログイン</span>
      <input
        name="email"
        type="email"
        required
        className="p-1 rounded-sm text-sm text-slate-900"
        placeholder="email"
      />
      <input
        id="password"
        name="password"
        type="password"
        required
        className="p-1 rounded-sm text-sm text-slate-900"
        placeholder="password"
      />
      <button
        type="submit"
        className={`${
          isError && 'animate-shake bg-red-500'
        } mt-2 p-1 rounded-full bg-green-500 text-sm shadow-md font-bold text-white`}
      >
        ログイン
      </button>
    </form>
  )
}
