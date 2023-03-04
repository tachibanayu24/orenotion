import { ComponentProps, SyntheticEvent } from 'react'

import { Icon } from '../Icon'

type Props = {
  className?: string
  onClick?: () => void
} & Pick<ComponentProps<typeof Icon>, 'icon' | 'size'>

export const IconButton = ({ icon, size, onClick, className }: Props) => {
  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onClick && onClick()
  }

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-md flex-shrink-0 hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-20 ${className}`}
    >
      <Icon icon={icon} size={size} />
    </button>
  )
}

const sizeClasses = {
  sm: 'p-0.5',
  md: 'p-1',
  lg: 'p-2',
} as const
