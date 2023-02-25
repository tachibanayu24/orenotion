import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  icon: keyof typeof icons
  size: 'sm' | 'md' | 'lg'
}

const icons = {
  plus: faPlus,
} as const

export const Icon = ({ icon, size }: Props) => {
  return (
    <FontAwesomeIcon
      icon={icons[icon]}
      className={`${sizeClasses[size]} flex justify-center items-center flex-shrink-0`}
    />
  )
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
} as const
