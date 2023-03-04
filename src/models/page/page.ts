import { JSONContent } from '@tiptap/core'

import { uid } from '@/libs/uniq-id'

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
  layer: number
  pageClass: keyof typeof PAGE_CLASS
  content?: JSONContent
  publishedAt: Date | null
  childIds?: string[]
  children?: Page[]

  constructor(init: Omit<Page, 'nestChildren' | 'isPrimary' | 'hasChildren'>) {
    super(init)

    this.emoji = init.emoji
    this.title = init.title
    this.layer = init.layer
    this.pageClass = init.pageClass
    this.content = init.content
    this.publishedAt = init.publishedAt
    this.childIds = init.childIds
    this.children = init.children
  }

  static create(
    params: OptionalByKey<
      Page,
      'id' | 'createdAt' | 'updatedAt' | 'nestChildren' | 'isPrimary' | 'hasChildren'
    >
  ) {
    return new Page({
      ...params,
      id: uid(),
      createdAt: new Date(),
    })
  }

  isPrimary() {
    return this.layer === 1
  }

  hasChildren(): this is Page & { children: NonNullable<Page['children']> } {
    return this.children !== undefined && this.children.length > 0
  }

  nestChildren(pages: Page[]) {
    const children = pages.filter((p) => this.childIds?.includes(p.id)).map((p) => new Page(p))
    this.children = children
  }
}
