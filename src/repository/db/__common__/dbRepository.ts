import { DocumentData, FirestoreError, QueryDocumentSnapshot, Timestamp } from '@/libs/firebase'
import { uid } from '@/libs/uniq-id'

import { db } from '@/config/firebase'

import { Entity } from '@/models/__common__/entity'
import { AuthError, DBError } from '@/models/__common__/error'

type DocumentValueType<T extends Entity> = ChangeTypeOfKeys<
  Exclude<T, 'id'>,
  'createdAt' | 'updatedAt',
  Timestamp
>

export abstract class DBRepository<T extends Entity> {
  uniqId = uid
  db = db

  protected docToObject(doc: QueryDocumentSnapshot<DocumentData>): T {
    const data = doc.data() as DocumentValueType<T>

    let newData = {} as T

    // すべてのTimestamp型のインスタンスをDateにパースする
    Object.keys(data).map((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const value = data[key] as unknown
      if (value instanceof Timestamp) newData = { ...newData, [key]: value.toDate() }
      else return (newData = { ...newData, [key]: value })
    })

    return {
      ...newData,
      id: doc.id,
    } as T
  }

  protected objectToDoc(
    obj: OptionalByKey<T, 'id' | 'createdAt' | 'updatedAt'>
  ): DocumentValueType<T> {
    // createdAtが存在してupdatedAtが存在しないときは更新とみなす
    const isUpdating = obj.createdAt && !obj.updatedAt

    const data = {
      ...obj,
      createdAt: obj.createdAt ? Timestamp.fromDate(obj.createdAt) : Timestamp.fromDate(new Date()),
      ...(isUpdating && { updatedAt: Timestamp.fromDate(new Date()) }),
    } as DocumentValueType<T>

    return data
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected getError = (error: Error | FirestoreError | any) => {
    switch (error.code as FirestoreError['code']) {
      case 'resource-exhausted':
        return new DBError(
          'Firestoreのリクエスト上限に達しました\n明日にならないと復旧しません',
          error
        )
      case 'already-exists':
        return new DBError('作成しようとしたデータはすでに存在します', error)
      case 'deadline-exceeded':
        return new DBError('操作が完了する前に上限時間を超えました', error)
      case 'internal':
        return new DBError('不明な内部エラーが発生しました', error)
      case 'permission-denied':
        console.error(error)
        return new DBError('ページが存在しないか、操作に必要な権限がありません', error)
      case 'unauthenticated':
        return new AuthError('認証エラーが発生しました', error)
      default:
        return new Error(error)
    }
  }
}
