import { DocumentData, QueryDocumentSnapshot, Timestamp } from '@/libs/firebase'
import { uid } from '@/libs/uniq-id'

import { Entity } from '@/models/__common__/entity'

type DocumentValueType<T extends Entity> = ChangeTypeOfKeys<
  Exclude<T, 'id'>,
  'createdAt' | 'updatedAt',
  Timestamp
>

export abstract class DBRepository<T extends Entity> {
  uid = uid

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
}