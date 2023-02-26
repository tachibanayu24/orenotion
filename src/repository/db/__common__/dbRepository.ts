import {
  collection,
  DocumentData,
  FirestoreErrorCode,
  getDocs,
  query,
  QueryDocumentSnapshot,
  Timestamp,
} from '@/libs/firebase'
import { uid } from '@/libs/uniq-id'

import { db } from '@/config/firebase'

import { Entity } from '@/models/__common__/entity'

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
        switch (e.code as FirestoreErrorCode) {
          case 'resource-exhausted':
            throw new Error('Firestoreのリクエスト上限に達しました\n明日にならないと復旧しません')
          case 'already-exists':
            throw new Error('作成しようとしたデータはすでに存在します')
          case 'deadline-exceeded':
            throw new Error('操作が完了する前に上限時間を超えました')
          case 'internal':
            throw new Error('不明な内部エラーが発生しました')
          case 'permission-denied':
            throw new Error('操作に必要な権限がありません')
          case 'unauthenticated':
            throw new Error('認証エラーが発生しました')
          default:
            throw new Error('不明なエラーが発生しました')
        }
      })
  }
}
