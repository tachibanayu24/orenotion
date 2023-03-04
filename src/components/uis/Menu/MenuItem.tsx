import { ComponentProps, SyntheticEvent } from 'react'

import { useLongPress } from '@/hooks'

import { Icon } from '../Icon/Icon'

type DefaultOptionType = {
  type: 'default'
  icon: ComponentProps<typeof Icon>['icon']
  title: string
  onClick: () => void
  isDanger?: boolean
}

type Props = {
  option: DefaultOptionType
  onClose: (e?: SyntheticEvent) => void
}

export const MenuItem = ({ option, onClose }: Props) => {
  const longPressHandlers = useLongPress(() => {
    option.onClick()
    onClose()
  }, 1000 + 100) // アニメーションは1000msで終わるが100ms余裕をもたせる

  const handleClick = (e: SyntheticEvent, onClick: () => void, isDanger?: boolean) => {
    e.stopPropagation()
    e.preventDefault()

    if (!isDanger) {
      onClick()
      onClose(e)
    }
  }

  return (
    <div
      onClick={(e) => handleClick(e, option.onClick, option.isDanger)}
      {...longPressHandlers}
      className={
        (option.isDanger
          ? 'text-red-400 hover:bg-transparent active:animate-progress active:bg-red-900 active:bg-opacity-70 w-[0%]'
          : 'hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-20') +
        ' rounded-md'
      }
    >
      <div className="w-36 flex items-center gap-1 hover:bg-white hover:bg-opacity-10 rounded-md py-1 px-2">
        <Icon icon={option.icon} size="sm" />
        <span className="whitespace-nowrap font-normal text-sm">{option.title}</span>
      </div>
    </div>
  )
}
