import 'highlight.js/styles/github-dark-dimmed.css'

import { EditorContent } from '@tiptap/react'

import { useLocalStorage } from '@/hooks'

import style from './style.module.css'
import { useEditor } from './useEditor'

type Props = Parameters<typeof useEditor>[0]

export const Editor = ({ onUpdate, onSave, content, editable }: Props) => {
  const { storedValue: isSidebarExpanded } = useLocalStorage('is-sidebar-expanded')

  const editor = useEditor({ onUpdate, onSave, content, editable })
  const pxClass = isSidebarExpanded ? 'px-8' : ''

  if (!editor) return <></>

  const handleFocus = () => editor?.chain().focus().run()

  return (
    <EditorContent
      onClick={handleFocus}
      className={`${style.editor} prose prose-sm w-full h-full text-gray-100 py-2 ${pxClass} placeholder:text-gray-500`}
      editor={editor}
    />
  )
}
