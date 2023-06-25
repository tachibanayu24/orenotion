import { where } from 'firebase/firestore'

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  orderBy,
} from '@/libs/firebase'

import { db } from '@/config/firebase'

import { NotFoundError } from '@/models/__common__/error'
import { Page } from '@/models/page'

import { DBRepository } from '../__common__/dbRepository'

export class PageRepository extends DBRepository<Page> {
  private PATH = 'pages'

  fetchAll = async ({ publishedOnly }: { publishedOnly: boolean }) => {
    const q = publishedOnly
      ? query(collection(db, this.PATH), where('publishedAt', '!=', null), orderBy('order', 'asc'))
      : query(collection(db, this.PATH), orderBy('order', 'asc'))

    return await getDocs(q)
      .then((res) => res.docs)
      .catch((e) => {
        throw this.getError(e)
      })
      .then((docs) =>
        docs.map((doc) => {
          return new Page(this.docToObject(doc))
        })
      )
  }

  get = async (id: string) => {
    const ref = doc(db, this.PATH, id)
    const document = await getDoc(ref).catch((e) => {
      throw this.getError(e)
    })

    if (!document.exists()) {
      throw new NotFoundError('ページが見つかりませんでした')
    } else {
      return new Page(this.docToObject(document))
    }
  }

  add = async (page: Omit<Page, 'createdAt' | 'updatedAt'>) => {
    const docId = page.id
    const newPage = { ...page, id: undefined }

    return await setDoc(doc(db, this.PATH, docId), this.objectToDoc(newPage))
  }

  update = async (id: string, updateObject: Partial<Page>) => {
    const ref = doc(db, this.PATH, id)
    return await updateDoc(ref, updateObject)
  }

  delete = async (id: Page['id']) => {
    return await deleteDoc(doc(db, this.PATH, id))
  }

  listen = (id: Page['id'], onUpdate: (page: Page) => void, onError?: (e: Error) => void) => {
    return onSnapshot(
      doc(db, this.PATH, id),
      (doc) => {
        if (doc.exists()) {
          onUpdate(new Page(this.docToObject(doc)))
        }
      },
      (e) => {
        onError && onError(this.getError(e))
      }
    )
  }
}
