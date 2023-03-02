import { EditorContent } from '@tiptap/react'

import style from './style.module.css'
import { useEditor } from './useEditor'
import 'highlight.js/styles/github-dark-dimmed.css'

type Props = Parameters<typeof useEditor>[0]

export const Editor = ({ onUpdate, onSave, content, editable }: Props) => {
  const editor = useEditor({ onUpdate, onSave, content, editable })

  if (!editor) return <></>

  const handleFocus = () => editor?.chain().focus().run()

  return (
    <EditorContent
      onClick={handleFocus}
      className={`${style.editor} prose prose-sm w-full h-full text-gray-100 py-2 px-8 placeholder:text-gray-500`}
      editor={editor}
    />
  )
}
