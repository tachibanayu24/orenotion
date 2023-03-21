import { ComponentProps, SyntheticEvent } from 'react'

import { Icon } from '../Icon'

type Props = {
  className?: string
  variant?: 'default' | 'contained'
  onClick?: () => void
} & Pick<ComponentProps<typeof Icon>, 'icon' | 'size'>

export const IconButton = ({ icon, size, variant = 'default', onClick, className }: Props) => {
  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onClick && onClick()
  }

  return (
    <button
      onClick={handleClick}
      className={`${
        sizeClasses[size]
      } rounded-full flex-shrink-0 hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-20 ${
        variant === 'contained' && 'bg-slate-500 text-slate-300'
      } ${className}`}
    >
      <Icon icon={icon} size={size} />
    </button>
  )
}

const sizeClasses = {
  xs: 'p-1',
  sm: 'p-1',
  md: 'p-1',
  lg: 'p-2',
} as const
