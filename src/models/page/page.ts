import { Entity } from '../__common__/entity'

export class Page extends Entity {
  emoji?: string
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any

  constructor(init: Page) {
    super(init)

    this.emoji = init.emoji
    this.title = init.title
    this.content = init.content
  }
}
