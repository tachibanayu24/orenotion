import { JSONContent } from '@tiptap/core'

import { Entity } from '../__common__/entity'

export class Page extends Entity {
  emoji: string
  title: string

  content?: JSONContent

  constructor(init: Page) {
    super(init)

    this.emoji = init.emoji
    this.title = init.title
    this.content = init.content
  }
}
