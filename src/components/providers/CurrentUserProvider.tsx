import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'

import { onAuthStateChanged } from '@/libs/firebase'

import { auth } from '@/config/firebase'

import { User } from '@/models/user'

export const CurrentUserContext = createContext<{
  currentUser: User | undefined
}>({
  currentUser: undefined,
})

type Props = {
  children: ReactNode
}

export const CurrentUserProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User>()

  const checkAuth = useCallback(
    () =>
      onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          setCurrentUser(
            User.create({
              isAdmin: true,
              createdAt: new Date(authUser.metadata.creationTime as string),
            })
          )
        }
      }),
    []
  )

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>{children}</CurrentUserContext.Provider>
  )
}
