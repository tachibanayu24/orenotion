import { ChangeEvent, useState } from 'react'

import { format } from 'date-fns'

import { useLocalStorage } from '@/hooks'

import { Page } from '@/models/page'
import { User } from '@/models/user'

import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import { EmojiPicker } from '../EmojiPicker'
import { Icon } from '../Icon'
import { IconButton } from '../IconButton'
import { Toggle } from '../Toggle'
import { Tooltip } from '../Tooltip'

type Props = {
  page: Page
  currentUser?: User
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void
  onSelectEmoji: (emoji: string) => Promise<void>
  onChangePublishedAt: (value: boolean) => Promise<void>
  isUpdating: boolean
}

export const PageHeader = ({
  page,
  currentUser,
  onSelectEmoji,
  onChangeTitle,
  onChangePublishedAt,
  isUpdating,
}: Props) => {
  const { storedValue: isSidebarExpanded } = useLocalStorage('is-sidebar-expanded')
  const [emojiOpen, setEmojiOpen] = useState(false)

  console.log(isSidebarExpanded)

  const mlClass = (isExpanded: boolean) => (isExpanded ? '' : 'ml-8')

  return (
    <div className="sticky top-0 bg-slate-900 z-floating -mt-2 pt-2">
      <div className={`flex justify-between items-center ${mlClass(isSidebarExpanded)}`}>
        <Breadcrumbs page={page} />
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
              {page.emoji}
            </button>
          </EmojiPicker>
          <div key={page.title} className="w-full">
            <input
              defaultValue={page.title}
              placeholder="Untitled"
              onChange={onChangeTitle}
              className="w-full bg-transparent font-extrabold  outline-none"
              readOnly={!currentUser?.isAdmin}
            />
          </div>
          {currentUser?.isAdmin && (
            <Toggle
              defaultChecked={Boolean(page.publishedAt)}
              label={['公開中', '未公開']}
              onChange={onChangePublishedAt}
            />
          )}
        </div>
        <div className="text-xs text-slate-300 flex justify-between">
          <div>
            <span className="mr-4">{format(page.createdAt, 'yyyy/MM/dd(eee) HH:mm')} 作成</span>
            <span className="mr-4">
              {page.publishedAt ? format(page.publishedAt, 'yyyy/MM/dd(eee) HH:mm') : '---'} 公開
            </span>
            <span>
              {page.updatedAt ? format(page.updatedAt, 'yyyy/MM/dd(eee) HH:mm') : '---'} 更新
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
