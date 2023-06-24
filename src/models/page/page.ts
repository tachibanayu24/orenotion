import { JSONContent } from '@tiptap/core'

import { uid } from '@/libs/uniq-id'

import { Entity } from '../__common__/entity'

export class Page extends Entity {
  emoji: string
  title: string
  layer: number
  content?: JSONContent
  publishedAt: Date | null
  childIds?: string[]
  children?: Page[]

  constructor(init: ExcludeMethods<Page>) {
    super(init)

    this.emoji = init.emoji
    this.title = init.title
    this.layer = init.layer
    this.content = init.content
    this.publishedAt = init.publishedAt
    this.childIds = init.childIds
    this.children = init.children
  }

  static create(params: OptionalByKey<ExcludeMethods<Page>, 'id' | 'createdAt'>) {
    return new Page({
      ...params,
      id: uid(),
      createdAt: new Date(),
    })
  }

  getTitle(option = { withEmoji: true }) {
    return option?.withEmoji
      ? `${this.emoji} ${this.title || 'Untitled'}`
      : this.title || 'Untitled'
  }

  isPrimary() {
    return this.layer === 1
  }

  hasChildren(): this is Page & { children: NonNullable<Page['children']> } {
    return this.children !== undefined && this.children.length > 0
  }

  nestChildren(pages: Page[]) {
    const children: Page[] = pages
      .filter((p) => this.childIds?.includes(p.id))
      .map((p) => p.nestChildren(pages))

    return new Page({ ...this, children: children })
  }

  getParent(pages: Page[]) {
    return pages.find((p) => p.childIds?.includes(this.id))
  }

  toJson(): ChangeTypeOfKeys<
    ExcludeMethods<Page>,
    'createdAt' | 'updatedAt' | 'publishedAt',
    string
  > {
    return {
      id: this.id,
      emoji: this.emoji,
      title: this.title,
      layer: this.layer,
      content: this.content,
      createdAt: this.createdAt.toLocaleString(),
      updatedAt: this.updatedAt?.toLocaleString() || '',
      publishedAt: this.publishedAt?.toLocaleString() || '',
      childIds: this.childIds || [],
    }
  }
}
