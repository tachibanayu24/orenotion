import { ReactNode, useState } from 'react'

type Props = {
  component: ReactNode
  children: ReactNode
  position: 'top-right'
  shouldOpenOnClick?: boolean
}

export const Tooltip = ({ component, children, position, shouldOpenOnClick }: Props) => {
  const [isDisplay, setIsDisplay] = useState(false)

  const renderContent = () => (
    <div
      className={`${positionClasses[position]} absolute z-50 p-2 rounded-md shadow-lg bg-slate-600`}
    >
      {component}
    </div>
  )

  return (
    <>
      <div
        className="relativ"
        onMouseOver={shouldOpenOnClick ? undefined : () => setIsDisplay(true)}
        onMouseLeave={
          shouldOpenOnClick
            ? undefined
            : () =>
                setTimeout(() => {
                  setIsDisplay(false)
                }, 200)
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
  'top-right': 'bottom-2 left-2',
}
