import admin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config()

// Inicializar Firebase Admin
let db, auth, firebaseInitialized = false

try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}')
  
  if (serviceAccount && serviceAccount.project_id) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID || serviceAccount.project_id
    })
    db = admin.firestore()
    auth = admin.auth()
    firebaseInitialized = true
    console.log('✅ Firebase inicializado com sucesso')
  } else {
    console.warn('⚠️ Credenciais Firebase inválidas - usando modo offline')
    // Criar mock do Firestore para testes
    db = {
      collection: () => ({
        doc: () => ({
          get: async () => ({ exists: false, data: () => ({}) }),
          set: async () => true,
          update: async () => true,
          delete: async () => true,
        }),
        get: async () => ({ docs: [] }),
        where: () => ({
          where: () => ({
            orderBy: () => ({
              get: async () => ({ docs: [] })
            }),
            get: async () => ({ docs: [] })
          }),
          orderBy: () => ({
            get: async () => ({ docs: [] })
          }),
          get: async () => ({ docs: [] })
        }),
        add: async () => ({ id: 'mock_id' })
      })
    }
  }
} catch (error) {
  console.error('❌ Erro ao inicializar Firebase:', error.message)
  // Fallback para modo offline
  db = {
    collection: () => ({
      doc: () => ({
        get: async () => ({ exists: false, data: () => ({}) }),
        set: async () => true,
        update: async () => true,
        delete: async () => true,
      }),
      get: async () => ({ docs: [] }),
      add: async () => ({ id: 'mock_id' })
    })
  }
}

export { firebaseInitialized }
export const getAuth = () => auth
export const getDb = () => db
export default admin
export { db }
export { auth }
