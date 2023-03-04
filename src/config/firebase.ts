import { initializeFirestore } from 'firebase/firestore'

import { getAuth, initializeApp } from '@/libs/firebase'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  // TODO: いらない
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)

export const db = initializeFirestore(app, { ignoreUndefinedProperties: true })

export const auth = getAuth(app)
// TODO: SSR
// export const analytics = getAnalytics(app);
