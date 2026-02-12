import dotenv from 'dotenv'

dotenv.config()

export const adminMiddleware = (req, res, next) => {
  try {
    const adminKey = req.headers['x-admin-key']
    const expectedKey = process.env.ADMIN_SECRET_KEY || 'admin@barbearia123'

    if (!adminKey || adminKey !== expectedKey) {
      return res.status(403).json({ error: 'Acesso de admin não autorizado' })
    }

    req.isAdmin = true
    next()
  } catch (error) {
    res.status(403).json({ error: 'Erro ao validar admin' })
  }
}

export default adminMiddleware
