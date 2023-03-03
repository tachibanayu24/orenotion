import { cloneElement, ReactElement, useEffect } from 'react'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import style from './style.module.css'

type Props = {
  isOpen: boolean
  onOpen?: () => void
  onClose: () => void
  onSelect: (emoji: string) => void
  children: ReactElement
}

export const EmojiPicker = ({ isOpen, onOpen, onClose, onSelect, children }: Props) => {
  const anchorWithOnClick = cloneElement(children, {
    onClick: onOpen,
  })

  const handleSelect = (emoji: { native: string }) => {
    onSelect(emoji.native)
    onClose()
  }

  // const picker = new PickerOrigin({
  //   data,
  //   onSelect: handleSelect,
  // }).injectStyles(style.)
  useEffect(() => {
    const dom = document.querySelector('em-emoji-picker')
    console.log('dom', dom)

    dom?.shadowRoot?.querySelector('section')?.setAttribute('style', 'background-color: #1e293b')
    // dom?.shadowRoot?.querySelector('.padding-small')?.setAttribute('background-color: #1e293b'
  }, [document])

  return (
    <div className="relative inline z-popup">
      {anchorWithOnClick}
      {isOpen && (
        <>
          <div className="absolute top-11 left-4 z-popup shadow-lg">
            <Picker
              data={data}
              onEmojiSelect={handleSelect}
              autoFocus
              emojiButtonSize={32}
              emojiSize={16}
              skinTonePosition="none"
              theme="dark"
              locale="ja"
              // className={`${style.picker} text-2lg`}
              className={style.picker}
              injectStyles={style.picker}
            />
          </div>
          <div className="fixed top-0 left-0 w-screen h-screen z-overlay" onClick={onClose} />
        </>
      )}
    </div>
  )
}
