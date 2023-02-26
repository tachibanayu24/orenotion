import { collection, query, getDocs, doc, getDoc, setDoc, deleteDoc } from '@/libs/firebase'

import { db } from '@/config/firebase'

import { Page } from '@/models/page'

import { DBRepository } from '../__common__/dbRepository'

// TODO: libs

export class PageRepository extends DBRepository<Page> {
  private PATH = 'pages'

  fetchAll = async () => {
    await this._fetchAll(this.PATH).then((docs) =>
      docs.map((doc) => {
        return new Page(this.docToObject(doc))
      })
    )

    // const q = query(collection(db, this.PATH))
    // const snap = await getDocs(q)
    // return snap.docs.map((doc) => {
    //   return new Page(this.docToObject(doc))
    // })
  }

  get = async (id: string) => {
    const ref = doc(db, this.PATH, id)
    const document = await getDoc(ref)

    if (!document.exists()) {
      // TODO: エラーインスタンスのカスタム
      throw new Error('ページが見つかりませんでした')
    } else {
      return new Page(this.docToObject(document))
    }
  }

  add = async (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => {
    const test = await setDoc(doc(db, this.PATH, this.uniqId()), this.objectToDoc(page))

    return await setDoc(doc(db, this.PATH, this.uniqId()), this.objectToDoc(page))
  }

  delete = async (id: Page['id']) => {
    return await deleteDoc(doc(db, this.PATH, id))
  }
}
