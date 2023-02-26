import { cloneElement, ComponentProps, ReactElement, SyntheticEvent, useState } from 'react'

import { Icon } from '../Icon/Icon'

type Props = {
  children: ReactElement
  position: 'bottom-right'
  options: {
    icon: ComponentProps<typeof Icon>['icon']
    title: string
    onClick: () => void
    isDanger?: boolean
  }[]
  onOpen?: () => void
  onClose?: () => void
}

export const Menu = ({ children, position, options, onOpen, onClose }: Props) => {
  const [isDisplay, setIsDisplay] = useState(false)

  const anchorWithOnClick = cloneElement(children, {
    onClick: () => {
      setIsDisplay(true)
      onOpen && onOpen()
    },
    className: 'relative',
  })

  const handleClick = (e: SyntheticEvent, onClick: Props['options'][number]['onClick']) => {
    e.stopPropagation()
    e.preventDefault()
    onClick()
    setIsDisplay(false)
    onClose && onClose()
  }

  return (
    <div className="relative">
      {anchorWithOnClick}
      {isDisplay && (
        <div
          className={`${positionClasses[position]} absolute flex flex-col gap-1 p-1 bg-slate-600 rounded-md shadow-lg`}
        >
          {options.map((option, i) => (
            <div
              key={`Menu-item-${i}`}
              onClick={(e) => handleClick(e, option.onClick)}
              className="w-full flex items-center gap-1 rounded-md hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-20 py-1 px-2"
            >
              <Icon icon={option.icon} size="sm" />
              <span className="whitespace-nowrap font-normal text-sm">{option.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const positionClasses = {
  'bottom-right': 'top-2 left-2',
}
