type Props = {
  onChange: (value: boolean) => void
  defaultChecked: boolean
  label: [string, string]
}

export const Toggle = ({ onChange, defaultChecked, label }: Props) => {
  const handleChange = () => {
    onChange(!defaultChecked)
  }

  return (
    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={handleChange}
        defaultChecked={defaultChecked}
      />
      <div className="w-11 h-6 bg-slate-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 shadow-md" />
      <span className="ml-1 text-xs font-bold align-baseline">
        {defaultChecked ? label[0] : label[1]}
      </span>
    </label>
  )
}
