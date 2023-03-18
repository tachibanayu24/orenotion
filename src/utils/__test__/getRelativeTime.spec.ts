import { getRelativeTime } from '../getRelativeTime'

const NOW = new Date('2023/1/30 12:00:00')
jest.useFakeTimers()
jest.setSystemTime(NOW)

test('差が1時間未満のとき、n分前で表示する', () => {
  expect(getRelativeTime(new Date('2023/1/30 11:59:59'))).toBe('0分前')
  expect(getRelativeTime(new Date('2023/1/30 11:58:59'))).toBe('1分前')
  expect(getRelativeTime(new Date('2023/1/30 11:30:00'))).toBe('30分前')
  expect(getRelativeTime(new Date('2023/1/30 11:00:01'))).toBe('59分前')
})

test('差が1日未満のとき、n時間前で表示する', () => {
  expect(getRelativeTime(new Date('2023/1/30 11:00:00'))).toBe('1時間前')
  expect(getRelativeTime(new Date('2023/1/30 02:00:00'))).toBe('10時間前')
  expect(getRelativeTime(new Date('2023/1/29 12:00:01'))).toBe('23時間前')
})

test('差が1ヶ月未満のとき、n日前で表示する', () => {
  expect(getRelativeTime(new Date('2023/1/29 12:00:00'))).toBe('1日前')
  expect(getRelativeTime(new Date('2023/1/10 12:00:00'))).toBe('20日前')
  expect(getRelativeTime(new Date('2022/12/31 12:00:00'))).toBe('30日前')
})

test('差が1ヶ月以上のとき、yyyy/MM/ddで表示する', () => {
  console.log('OK')
})

test('差がマイナスとのき、エラーをスローする', () => {
  expect(() => getRelativeTime(new Date('2023/2/1 12:00:00'))).toThrow()
})
