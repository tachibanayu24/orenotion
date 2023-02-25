import { collection, query, getDocs, doc, getDoc, setDoc } from 'firebase/firestore'

import { db } from '@/config/firebase'

import { Page } from '@/models/page'

import { DBRepository } from '../__common__/dbRepository'

// TODO: libs

const q = query(collection(db, 'pages'))

export class PageRepository extends DBRepository<Page> {
  fetchAll = async () => {
    const snap = await getDocs(q)
    return snap.docs.map((doc) => {
      return new Page(this.docToObject(doc))
    })
  }

  get = async (id: string) => {
    const ref = doc(db, 'pages', id)
    const document = await getDoc(ref)

    if (!document.exists()) {
      // TODO: エラーインスタンスのカスタム
      throw new Error('ページが見つかりませんでした')
    } else {
      return new Page(this.docToObject(document))
    }
  }

  add = async (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => {
    return setDoc(doc(db, 'pages', this.uid()), this.objectToDoc(page))
  }
}
