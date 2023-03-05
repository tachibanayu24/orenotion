import { Icon } from '../Icon'

type Props = {
  type: 'success' | 'failure'
  message: string
}

export const Snackbar = ({ type, message }: Props) => {
  return (
    <div className={`flex max-w-2xl bg-slate-600 py-1.5 px-2 rounded-md shadow-md`}>
      <div
        className={`flex items-center ${type === 'success' ? 'text-green-500' : 'text-red-500'}`}
      >
        {type === 'success' && <Icon icon="check" size="md" />}
        {type === 'failure' && <Icon icon="triangleExclamation" size="md" />}
      </div>
      <p className="text-sm ml-2.5 text-slate-200">{message}</p>
    </div>
  )
}
