import { ReactNode, useState } from 'react'

type Props = {
  component: ReactNode
  children: ReactNode
  position: 'top-right'
}

export const Tooltip = ({ component, children, position }: Props) => {
  const [isDisplay, setIsDisplay] = useState(false)

  return (
    <>
      <div
        className="relativ"
        onMouseOver={() => setIsDisplay(true)}
        onMouseLeave={() =>
          setTimeout(() => {
            setIsDisplay(false)
          }, 200)
        }
      >
        {children}
        {isDisplay && (
          <div
            className={`${positionClasses[position]} absolute z-50 p-2 rounded-md shadow-lg bg-slate-600`}
          >
            {component}
          </div>
        )}
      </div>
    </>
  )
}

const positionClasses = {
  'top-right': 'bottom-2 left-2',
}
