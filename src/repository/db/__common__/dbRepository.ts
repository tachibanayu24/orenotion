import {
  collection,
  DocumentData,
  FirestoreError,
  FirestoreErrorCode,
  getDocs,
  query,
  QueryDocumentSnapshot,
  Timestamp,
} from '@/libs/firebase'
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

    return {
      ...data,
      id: doc.id,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt?.toDate(),
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

  // TODO: privateに分岐を切り離す
  // TODO: custom errorインスタンス

  protected _fetchAll = async (path: string) => {
    const q = query(collection(db, path))
    return await getDocs(q)
      .then((res) => res.docs)
      .catch((e) => {
        throw this.getError(e)
      })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getError = (error: Error | FirestoreError | any) => {
    if (error instanceof Error) {
      return error
    } else if (error instanceof FirestoreError) {
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
          return new DBError('操作に必要な権限がありません', error)
        case 'unauthenticated':
          return new AuthError('認証エラーが発生しました', error)
        default:
          return new Error('不明なエラーが発生しました', error)
      }
    } else {
      return new Error('不明なエラーが発生しました')
    }
  }
}
