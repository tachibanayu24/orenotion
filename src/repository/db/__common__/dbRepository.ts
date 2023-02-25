import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

export abstract class DBRepository {
  protected documentToObject(doc: QueryDocumentSnapshot<DocumentData>) {
    return { id: doc.id, metadata: doc.metadata, ...doc.data() }
  }
}
