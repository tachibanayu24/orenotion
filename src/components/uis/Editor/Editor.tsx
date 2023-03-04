import 'highlight.js/styles/github-dark-dimmed.css'

import { memo, useCallback, useState } from 'react'

import { EditorContent, JSONContent } from '@tiptap/react'

import { useTraceUpdate } from '@/hooks/useTraceUpdate'

import style from './style.module.css'
import { useEditor } from './useEditor'

type Props = Parameters<typeof useEditor>[0]

// export const Editor = memo(({ onUpdate, onSave, content, editable }: Props) => {
//   const [currentContent, setCurrentContent] = useState<JSONContent>()

//   const handleChange = (json: JSONContent) => {
//     setCurrentContent(json)
//     onUpdate(json)
//   }

//   const editor = useEditor({ onUpdate: handleChange, onSave, content: currentContent, editable })
//   const handleFocus = () => editor?.chain().focus().run()

//   useTraceUpdate({ onUpdate, onSave, content, editable }, 'Editor')

//   if (!editor) return <></>

//   return (
//     <EditorContent
//       key="editor"
//       onClick={handleFocus}
//       className={`${style.editor} prose prose-sm w-full h-full text-gray-100 py-2  px-0 lg:px-8 placeholder:text-gray-500`}
//       editor={editor}
//     />
//   )
// })

export const Editor = memo(({ onUpdate, onSave, content, editable }: Props) => {
  const editor = useEditor({ onUpdate, onSave, content, editable })
  const handleFocus = () => editor?.chain().focus().run()

  useTraceUpdate({ onUpdate, onSave, content, editable }, 'Editor')

  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) return <></>

  return (
    <>
      <button onClick={addImage}>setImage</button>

      <EditorContent
        key="editor"
        onClick={handleFocus}
        className={`${style.editor} prose prose-sm w-full h-full text-gray-100 py-2  px-0 lg:px-8 placeholder:text-gray-500`}
        editor={editor}
      />
    </>
  )
})
