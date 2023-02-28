// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throttle = <T extends (...args: any[]) => ReturnType<T>>(fn: T, delay: number) => {
  let flag = true
  return function () {
    if (flag) {
      fn()
      flag = false
      setTimeout(() => (flag = true), delay)
    }
  }
}
