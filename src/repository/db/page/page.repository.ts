import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore'

import { db } from '@/config/firebase'

import { DBRepository } from '../__common__/dbRepository'

// TODO: libs

const q = query(collection(db, 'pages'))

export class PageRepository extends DBRepository {
  fetchAll = async () => {
    const snap = await getDocs(q)
    return snap.docs.map((doc) => {
      return this.documentToObject(doc)
    })
  }

  get = async (id: string) => {
    const ref = doc(db, 'pages', id)
    const document = await getDoc(ref)

    if (!document.exists()) {
      // TODO: エラーインスタンス
      throw new Error('ページが見つかりませんでした')
    } else {
      return this.documentToObject(document)
    }
  }
}
