import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Substitua com suas credenciais do Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDummyKeyForTesting123456789',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'teste-barbearia.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'teste-barbearia',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'teste-barbearia.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abcdef123456'
}

let app
let auth
let db

try {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
} catch (error) {
  console.warn('⚠️ Firebase não inicializado - usando modo offline:', error.message)
  
  // Mock objects para modo offline
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback) => {
      callback(null)
      return () => {}
    }
  }
  
  db = {
    collection: () => ({
      get: async () => ({ docs: [] }),
      add: async (data) => ({ id: Date.now().toString() }),
      doc: (id) => ({
        get: async () => ({ exists: false }),
        update: async (data) => {},
        delete: async () => {},
        set: async (data) => {}
      })
    })
  }
}

export { auth, db }

