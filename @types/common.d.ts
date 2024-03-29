/**
 * Tに含まれるKeysの型に割り当て可能なNewTypeを指定し、オブジェクトの特定の型を変更します
 * @example
 * type User = { name: string, email: string, createdAt: Timestamp, updatedAt: Timestamp }
 * ChangeTypeOfKeys<User, "createdAt" | "updatedAt", Date>
 * // => { name: string, email: string, createdAt: Date, updatedAt: Date }
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type ChangeTypeOfKeys<T extends Record<string, any>, Keys extends keyof T, NewType> = {
  [key in keyof T]: key extends Keys ? NewType : T[key]
}

/**
 * 一部のkeyをoptionalにします
 * @example
 * type User = { name: string, email: string, age: number }
 * Optional<User, "name" | "age">
 * // => { name?: string, email: string, age?: number }
 */
declare type OptionalByKey<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * classからMethodを取り除いた型を生成します
 * @example
 * class Hoge { prop: number; method(): void };
 * type Props = ExcludeMethods<Hoge>;
 * // => { prop: number }
 */
declare type ExcludeMethods<T> =
  // eslint-disable-next-line @typescript-eslint/ban-types
  Pick<T, { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]>
