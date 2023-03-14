import 'highlight.js/styles/github-dark-dimmed.css'

import { memo, useCallback } from 'react'

import { EditorContent } from '@tiptap/react'

import { useCurrentUser } from '@/hooks'

import style from './style.module.css'
import { useEditor } from './useEditor'

type Props = Parameters<typeof useEditor>[0]

export const Editor = memo(({ onUpdate, onSave, content, editable }: Props) => {
  const { currentUser } = useCurrentUser()
  const editor = useEditor({ onUpdate, onSave, content, editable })
  const handleFocus = () => editor?.chain().focus().run()

  const handleAddImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) return <></>

  return (
    <>
      {currentUser?.isAdmin && (
        <button
          onClick={handleAddImage}
          className="px-3 py-1 rounded-full border border-slate-400 bg-slate-700 text-sm font-semibold"
        >
          画像を貼り付ける
        </button>
      )}

      <EditorContent
        key="editor"
        onClick={handleFocus}
        className={`${style.editor} prose prose-sm w-full h-full text-gray-100 py-2  px-0 lg:px-8 placeholder:text-gray-500 pb-20`}
        editor={editor}
      />
    </>
  )
})
