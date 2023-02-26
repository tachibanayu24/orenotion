import { cloneElement, ComponentProps, ReactElement, useState } from 'react'

import { MenuItem } from './MenuItem'
import { Icon } from '../Icon/Icon'

type DefaultOptionType = {
  type: 'default'
  icon: ComponentProps<typeof Icon>['icon']
  title: string
  onClick: () => void
  isDanger?: boolean
}

type DividerOptionType = {
  type: 'divider'
}

type Props = {
  children: ReactElement
  position: 'bottom-right'
  options: (DefaultOptionType | DividerOptionType)[]
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
  })

  const handleCloseMenu = () => {
    setIsDisplay(false)
    onClose && onClose()
  }

  return (
    <div className="relative">
      {anchorWithOnClick}
      {isDisplay && (
        <div
          className={`${positionClasses[position]} absolute z-50 flex flex-col gap-1 p-1 bg-slate-700 rounded-md shadow-lg`}
        >
          {options.map((option, i) =>
            option.type === 'default' ? (
              <MenuItem key={`MenuItem-${i}`} option={option} onClose={handleCloseMenu} />
            ) : option.type === 'divider' ? (
              <hr key={`MenuItem-${i}`} className="border-slate-500" />
            ) : undefined
          )}
        </div>
      )}

      {isDisplay && (
        <div className="fixed top-0 left-0 w-screen h-screen z-40" onClick={handleCloseMenu} />
      )}
    </div>
  )
}

const positionClasses = {
  'bottom-right': 'top-3 left-3',
}
