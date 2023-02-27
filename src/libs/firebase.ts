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
  updateDoc,
  FirestoreError,
} from 'firebase/firestore'

export type { DocumentData, FirestoreErrorCode } from 'firebase/firestore'

export { initializeApp } from 'firebase/app'
export { getAnalytics } from 'firebase/analytics'

export { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
