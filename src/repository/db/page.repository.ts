import { db } from '@/config/firebase'
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore'

const q = query(collection(db, 'pages'))

export const fetchPages = async () => {
  const snap = await getDocs(q)
  return snap.docs.map((doc) => {
    return { id: doc.id, metadata: doc.metadata, ...doc.data() }
  })
}

export const fetchPageDetail = async (id: string) => {
  console.log(id)
  const ref = doc(db, 'pages', id)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    // TODO: エラーインスタンス
    throw new Error('ページが見つかりませんでした')
  } else {
    return snap.data()
  }
}
