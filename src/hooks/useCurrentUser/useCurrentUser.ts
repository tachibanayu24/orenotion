import { useContext } from 'react'

import { CurrentUserContext } from '@/components/providers'

import { User } from '@/models/user'

export const useCurrentUser = (): {
  currentUser: User | undefined
} => {
  const { currentUser } = useContext(CurrentUserContext)

  return { currentUser }
}
