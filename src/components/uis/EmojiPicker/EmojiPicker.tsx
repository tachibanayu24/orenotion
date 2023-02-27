import { cloneElement, ReactElement } from 'react'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

type Props = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onSelect: (emoji: string) => void
  children: ReactElement
}

export const EmojiPicker = ({ isOpen, onOpen, onClose, onSelect, children }: Props) => {
  const anchorWithOnClick = cloneElement(children, {
    onClick: onOpen,
  })

  return (
    <div className="relative inline z-popup">
      {anchorWithOnClick}
      {isOpen && (
        <>
          <div className="absolute top-11 left-4 z-popup shadow-lg">
            <Picker
              data={data}
              onEmojiSelect={onSelect}
              autoFocus
              emojiButtonSize={32}
              emojiSize={16}
              skinTonePosition="none"
              theme="dark"
              locale="ja"
            />
          </div>
          <div className="fixed top-0 left-0 w-screen h-screen z-overlay" onClick={onClose} />
        </>
      )}
    </div>
  )
}
