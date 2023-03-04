import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import {
  faClone,
  faCopy,
  faEllipsis,
  faLink,
  faPlus,
  faCircleNotch,
  faTrash,
  faHome,
  faAnglesLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  icon: keyof typeof icons
  size: 'sm' | 'md' | 'lg'
  shouldSpin?: boolean
}

const icons = {
  plus: faPlus,
  elipsis: faEllipsis,
  link: faLink,
  clone: faClone,
  copy: faCopy,
  trash: faTrash,
  twitter: faTwitter,
  spin: faCircleNotch,
  home: faHome,
  anglesLeft: faAnglesLeft,
  anglesRight: faAnglesRight,
} as const

export const Icon = ({ icon, size, shouldSpin }: Props) => {
  return (
    <FontAwesomeIcon
      icon={icons[icon]}
      className={`${sizeClasses[size]} flex justify-center items-center flex-shrink-0 ${
        shouldSpin && 'animate-spin'
      }`}
    />
  )
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
} as const
