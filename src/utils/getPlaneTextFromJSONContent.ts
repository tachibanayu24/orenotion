import { JSONContent } from '@tiptap/core'

const getValueRecursive = (object: JSONContent, key: string) => {
  let value = ''
  Object.keys(object).forEach((k) => {
    if (k === key) {
      value = `${value} ${object[k]}`
    }
    if (object[k] && typeof object[k] === 'object') {
      value = `${value} ${getValueRecursive(object[k], key)}`
    }
  })

  return value
}

export const getPlaneTextFromJSONContent = (content: JSONContent, max?: number) => {
  const result = getValueRecursive(content, 'text').replace(/ +/g, ' ')

  return max && result.length > max ? result.substring(0, max) + '...' : result
}
