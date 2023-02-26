import { ReactNode, useState } from 'react'

type Props = {
  component: ReactNode
  children: ReactNode
  position: 'top-right' | 'bottom-left'
  shouldOpenOnClick?: boolean
}

export const Tooltip = ({ component, children, position, shouldOpenOnClick }: Props) => {
  const [isDisplay, setIsDisplay] = useState(false)

  const renderContent = () => {
    const stringClasses = typeof component === 'string' ? 'text-xs select-none' : undefined
    return (
      <div
        className={`${positionClasses[position]} ${stringClasses} w-max absolute z-50 p-1 rounded-md shadow-lg bg-slate-600`}
      >
        {component}
      </div>
    )
  }

  return (
    <>
      <div
        className="relative"
        onMouseOver={shouldOpenOnClick ? undefined : () => setIsDisplay(true)}
        onMouseLeave={
          shouldOpenOnClick
            ? undefined
            : () =>
                setTimeout(() => {
                  setIsDisplay(false)
                }, 100)
        }
      >
        <div onClick={shouldOpenOnClick ? () => setIsDisplay(true) : undefined}>{children}</div>
        {isDisplay && renderContent()}

        {isDisplay && shouldOpenOnClick && (
          <div
            className="fixed top-0 left-0 w-screen h-screen z-40"
            onClick={() => setIsDisplay(false)}
          />
        )}
      </div>
    </>
  )
}

const positionClasses = {
  'top-right': 'bottom-8 left-2',
  'bottom-left': 'top-8 right-2',
}
