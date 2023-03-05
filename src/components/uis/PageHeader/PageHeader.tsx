import { ChangeEvent, useEffect, useState } from 'react'

import { format } from 'date-fns'

import { useLayout } from '@/hooks/useLayout'
// import { useTraceUpdate } from '@/hooks/useTraceUpdate'

import { Page } from '@/models/page'
import { User } from '@/models/user'

import { Breadcrumbs } from './Breadcrumbs'
import { EmojiPicker } from '../EmojiPicker'
import { Icon } from '../Icon'
import { IconButton } from '../IconButton'
import { Toggle } from '../Toggle'
import { Tooltip } from '../Tooltip'

type Props = {
  pages: Page[]
  currentPage: Page
  currentUser?: User
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void
  onSelectEmoji: (emoji: string) => Promise<void>
  onChangePublishedAt: (value: boolean) => Promise<void>
  isUpdating: boolean
}

export const PageHeader = ({
  pages,
  currentPage,
  currentUser,
  onSelectEmoji,
  onChangeTitle,
  onChangePublishedAt,
  isUpdating,
}: Props) => {
  const { isExpandedSidebar } = useLayout()

  const [emojiOpen, setEmojiOpen] = useState(false)
  const [title, setTitle] = useState('')

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    onChangeTitle(e)
  }

  useEffect(() => {
    setTitle(currentPage.title)
  }, [currentPage.title])

  // useTraceUpdate(
  //   { page, currentUser, onSelectEmoji, onChangeTitle, onChangePublishedAt, isUpdating },
  //   'Header'
  // )

  return (
    <div className="sticky top-0 z-floating bg-slate-900 -mt-2 -mx-2 px-2 pt-2">
      <div className={`flex justify-between items-center ${!isExpandedSidebar && 'ml-8'}`}>
        <Breadcrumbs currentPage={currentPage} pages={pages} />
        <Tooltip position="bottom-left" component="シェアする">
          <IconButton icon="twitter" size="md" />
        </Tooltip>
      </div>
      <div>
        <div className="flex items-center gap-1 text-3xl">
          <EmojiPicker
            isOpen={emojiOpen}
            onOpen={currentUser?.isAdmin ? () => setEmojiOpen(true) : undefined}
            onClose={() => setEmojiOpen(false)}
            onSelect={onSelectEmoji}
          >
            <button className="w-11 h-11 text-3xl p-1 hover:bg-white hover:bg-opacity-10 rounded-md">
              {currentPage.emoji}
            </button>
          </EmojiPicker>
          <div className="w-full">
            <input
              value={title}
              placeholder="Untitled"
              onChange={handleChangeTitle}
              className="w-full bg-transparent font-extrabold  outline-none"
              readOnly={!currentUser?.isAdmin}
            />
          </div>
          {currentUser?.isAdmin && (
            <Toggle
              checked={Boolean(currentPage.publishedAt)}
              label={['公開中', '未公開']}
              onChange={onChangePublishedAt}
            />
          )}
        </div>
        <div className="text-xs text-slate-300 flex justify-between">
          <div>
            {currentUser?.isAdmin && (
              <span className="mr-4">
                {format(currentPage.createdAt, 'yyyy/M/d(eee) H:m')} 作成
              </span>
            )}
            <span className="mr-4">
              {currentPage.publishedAt
                ? format(currentPage.publishedAt, 'yyyy/M/d(eee) H:m')
                : '---'}{' '}
              公開
            </span>
            <span>
              {currentPage.updatedAt ? format(currentPage.updatedAt, 'yyyy/M/d(eee) H:m') : '---'}{' '}
              更新
            </span>
          </div>
          {isUpdating && (
            <span>
              <div className="flex gap-2 items-center">
                <Icon icon="spin" size="sm" shouldSpin /> 保存中...
              </div>
            </span>
          )}
        </div>
      </div>
      <hr className="border-slate-500 mt-2 -mx-4" />
    </div>
  )
}
