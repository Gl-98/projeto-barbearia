import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import barbersRouter from './routes/barbers.js'
import servicesRouter from './routes/services.js'
import bookingsRouter from './routes/bookings.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Rotas
app.use('/api/barbers', barbersRouter)
app.use('/api/services', servicesRouter)
app.use('/api/bookings', bookingsRouter)

// Rota de Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API funcionando!' })
})

// Iniciar servidor
try {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
    console.log(`📊 Acesse: http://localhost:3000/admin`)
  })
} catch (error) {
  console.error('Erro ao iniciar servidor:', error)
}

export default app
