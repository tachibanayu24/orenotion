import 'highlight.js/styles/github-dark-dimmed.css'

import { memo, useCallback, useState } from 'react'

import { EditorContent } from '@tiptap/react'

import { useCurrentUser } from '@/hooks'

import style from './style.module.css'
import { useEditor } from './useEditor'
import { IconButton } from '../IconButton'

type Props = Parameters<typeof useEditor>[0]

export const Editor = memo(({ onUpdate, onSave, content, editable }: Props) => {
  const { currentUser } = useCurrentUser()
  const editor = useEditor({ onUpdate, onSave, content, editable })

  const [isDisplayInsertContainer, setIsDisplayInsertContainer] = useState(true)

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
      {currentUser?.isAdmin && isDisplayInsertContainer && (
        <div className="sticky top-40  inline-flex float-right flex-col gap-2 z-floating p-2 pb-4 rounded-lg bg-slate-800 text-center">
          <IconButton
            icon="x"
            size="xs"
            onClick={() => setIsDisplayInsertContainer((prev) => !prev)}
            variant="contained"
            className="absolute -right-1 -top-1"
          />
          <span className="text-sm font-semibold">要素の挿入</span>
          <button
            onClick={handleAddImage}
            className="px-3 py-0.5 rounded-full border border-slate-400 bg-slate-700 text-xs"
          >
            画像を挿入
          </button>

          <button
            onClick={console.log}
            className="px-3 py-0.5 rounded-full border border-slate-400 bg-slate-700 text-xs"
          >
            テーブルを挿入
          </button>
        </div>
      )}

      <EditorContent
        key="editor"
        onClick={handleFocus}
        className={`${style.editor} prose prose-sm w-full h-full text-gray-100 py-2  px-0 lg:px-40 placeholder:text-gray-500 pb-10`}
        editor={editor}
      />
    </>
  )
})
