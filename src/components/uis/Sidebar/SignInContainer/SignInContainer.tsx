'use client'

import { useRouter } from 'next/navigation'

import { signOut } from '@/libs/firebase'

import { auth } from '@/config/firebase'

import { useCurrentUser } from '@/hooks'

import { SignInForm } from './SignInForm'

import { Tooltip } from '../../Tooltip'

export const SignInContainer = () => {
  const router = useRouter()

  const { currentUser } = useCurrentUser()

  const handleSignOut = () => {
    signOut(auth)
    router.refresh()
  }

  return currentUser?.isAdmin ? (
    <Tooltip
      position="top-right"
      shouldOpenOnClick
      component={
        <div className="w-60 flex flex-col gap-2 p-3">
          <button
            onClick={handleSignOut}
            className={`p-1 rounded-full border border-green-400 text-sm shadow-md font-bold text-green-400`}
          >
            ログアウト
          </button>
        </div>
      }
    >
      <div className="block bg-red-800 text-xs text-center -m-2 font-bold cursor-pointer rounded-b-3xl lg:rounded-none">
        Admin Mode
      </div>
    </Tooltip>
  ) : (
    <Tooltip position="top-right" shouldOpenOnClick component={<SignInForm />}>
      <div className="block bg-slate-700 text-xs text-center -m-2 cursor-pointer rounded-b-3xl lg:rounded-none">
        Admin Settings
      </div>
    </Tooltip>
  )
}
