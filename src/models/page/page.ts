import { JSONContent } from '@tiptap/core'

import { Entity } from '../__common__/entity'

type PageClass =
  // 管理者のみが閲覧・編集できる
  | 'tier1'
  // 管理者が閲覧・編集できる / トークンを所持している一般ユーザーが閲覧できる
  | 'tier2'
  //  管理者のみが閲覧・編集できる / 一般ユーザーが閲覧できる
  | 'tier3'
  // すべてのユーザーが閲覧・編集できる
  | 'tier4'

export class Page extends Entity {
  emoji: string
  title: string
  pageClass: PageClass
  content?: JSONContent
  publishedAt?: Date

  constructor(init: Page) {
    super(init)

    this.emoji = init.emoji
    this.title = init.title
    this.pageClass = init.pageClass
    this.content = init.content
    this.publishedAt = init.publishedAt
  }
}
