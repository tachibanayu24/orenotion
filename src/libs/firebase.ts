export {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  setDoc,
  QueryDocumentSnapshot,
  Timestamp,
  getFirestore,
  deleteDoc,
} from 'firebase/firestore'

export type { DocumentData } from 'firebase/firestore'

export { initializeApp } from 'firebase/app'
export { getAnalytics } from 'firebase/analytics'

export { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
