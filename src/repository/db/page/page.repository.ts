import { doc, getDoc, setDoc, deleteDoc, updateDoc } from '@/libs/firebase'

import { db } from '@/config/firebase'

import { Page } from '@/models/page'

import { DBRepository } from '../__common__/dbRepository'

export class PageRepository extends DBRepository<Page> {
  private PATH = 'pages'

  fetchAll = async () => {
    return await this._fetchAll(this.PATH).then((docs) =>
      docs.map((doc) => {
        return new Page(this.docToObject(doc))
      })
    )
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
    return await setDoc(doc(db, this.PATH, this.uniqId()), this.objectToDoc(page))
  }

  update = async (id: string, updateObject: Partial<Page>) => {
    const ref = doc(db, this.PATH, id)
    return await updateDoc(ref, updateObject)
  }

  delete = async (id: Page['id']) => {
    return await deleteDoc(doc(db, this.PATH, id))
  }
}
