// import { mergeAttributes } from '@tiptap/core'
import Link from '@tiptap/extension-link'

const isInternal = (link: string) =>
  Boolean(link.match(/http:\/\/localhost/) || link.match(/doc.tachibanayu24.com/))

export const CustomLink = Link.extend({
  openOnClick: true,
  renderHTML({ mark, HTMLAttributes }) {
    const el = document.createElement('a')
    el.href = HTMLAttributes.href
    el.target = isInternal(HTMLAttributes.href) ? '_self' : '_blank'
    el.innerHTML = mark.attrs.html
    el.className = isInternal(HTMLAttributes.href) ? 'custom-link-internal' : 'custom-link-external'
    console.log(el)

    return el
  },
})
