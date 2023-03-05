import { useContext } from 'react'

import { SnackBarContext } from '@/components/providers'

export const useSnackbar = () => useContext(SnackBarContext)
