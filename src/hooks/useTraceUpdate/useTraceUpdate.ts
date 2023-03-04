import { useRef, useEffect } from 'react'

/**
 * コンポーネントのpropsなどの挙動を確認するためのトレーサーです
 * ローカル開発環境のみで利用できることに注意してください
 *
 * @param props 挙動を確認したいprops
 * @param componentName コンポーネントやhooksの名前
 * @example upTraceUpdate({ prop1, prop2, prop3 }, "TextField") // 3つのpropsの挙動を確認できる
 */
export const useTraceUpdate = (
  props: Record<string, unknown>,
  componentName = 'This component'
) => {
  const previousProps = useRef(props)

  useEffect(() => {
    console.log(`%c${componentName} rendered first time`, `color: white; background-color: green;`)

    console.table(props)
    // 初期レンダリング時に限定する
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const changedProps = Object.entries(props).reduce(
      (acc, [k, v]) => (previousProps.current[k] === v ? acc : { ...acc, [k]: v }),
      {}
    )

    // propsが変更されたときのみログを出力する
    if (Object.keys(changedProps).length > 0) {
      console.log(`%c${componentName} re-rendered`, `color: white; background-color: blue;`)
      console.table(
        Object.entries(changedProps).reduce(
          (acc, [k, v]) => ({
            ...acc,
            [k]: {
              previous: previousProps.current[k],
              current: v,
            },
          }),
          {}
        )
      )
    }
    previousProps.current = props
  })
}
