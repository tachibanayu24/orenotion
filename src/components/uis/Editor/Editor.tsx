import 'highlight.js/styles/github-dark-dimmed.css'

import { EditorContent } from '@tiptap/react'

import style from './style.module.css'
import { useEditor } from './useEditor'

type Props = Parameters<typeof useEditor>[0]

export const Editor = ({ onUpdate, onSave, content, editable }: Props) => {
  const editor = useEditor({ onUpdate, onSave, content, editable })
  const handleFocus = () => editor?.chain().focus('end').run()

  if (!editor) return <></>

  return (
    <EditorContent
      key="editor"
      onClick={handleFocus}
      className={`${style.editor} prose prose-sm w-full h-full text-gray-100 py-2  px-0 lg:px-8 placeholder:text-gray-500`}
      editor={editor}
    />
  )
}
