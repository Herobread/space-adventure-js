import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.DATABASE_URL,
    storageBucket: process.env.PROJECT_ID,
    messagingSenderId: process.env.STORAGE_BUCKET,
    appId: process.env.APP_ID,
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
