import { JSONContent } from '@tiptap/core'

import { Entity } from '../__common__/entity'

export const PAGE_CLASS = {
  /**
   * 管理者のみが閲覧・編集できる
   */
  TIER1: 'TIER1',
  /**
   * 管理者が閲覧・編集できる / トークンを所持している一般ユーザーが閲覧できる
   */
  TIER2: 'TIER2',
  /**
   *  管理者のみが閲覧・編集できる / 一般ユーザーが閲覧できる
   */
  TIER3: 'TIER3',
  /**
   * すべてのユーザーが閲覧・編集できる
   */
  TIER4: 'TIER4',
} as const

export class Page extends Entity {
  emoji: string
  title: string
  pageClass: keyof typeof PAGE_CLASS
  content?: JSONContent
  publishedAt: Date | null

  constructor(init: Page) {
    super(init)

    this.emoji = init.emoji
    this.title = init.title
    this.pageClass = init.pageClass
    this.content = init.content
    this.publishedAt = init.publishedAt
  }
}
