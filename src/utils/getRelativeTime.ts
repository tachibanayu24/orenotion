import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
  isBefore,
} from 'date-fns'

export const getRelativeTime = (target: Date) => {
  const now = new Date()

  if (isBefore(now, target)) {
    throw new Error('対象の時間は現在時刻より前である必要があります')
  }

  const diffHours = differenceInHours(now, target)
  const diffMinutes = differenceInMinutes(now, target)
  const diffDays = differenceInDays(now, target)

  if (diffMinutes < 60) {
    return `${diffMinutes}分前`
  } else if (diffHours < 24) {
    return `${diffHours}時間前`
  } else if (diffDays < 31) {
    return `${diffDays}日前`
  } else {
    return format(target, 'yyyy/MM/dd')
  }
}
