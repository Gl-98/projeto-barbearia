import { db } from '../config/firebase.js'

// Armazenamento em memória para teste (será substituído por Firestore em produção)
let servicesMemory = [
  { id: '1', name: 'Corte Clássico', description: 'Corte padrão', duration: 30, price: 50, createdAt: new Date() },
  { id: '2', name: 'Barba Completa', description: 'Barba + corte', duration: 45, price: 80, createdAt: new Date() }
]

export const serviceController = {
  getAll: async (req, res) => {
    try {
      res.json(servicesMemory)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  getById: async (req, res) => {
    try {
      const service = servicesMemory.find(s => s.id === req.params.id)
      if (!service) return res.status(404).json({ error: 'Serviço não encontrado' })
      res.json(service)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  create: async (req, res) => {
    try {
      const { name, description, duration, price } = req.body

      const durationNum = Number(duration)
      const priceNum = Number(price)

      if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Nome é obrigatório' })
      }

      if (!Number.isFinite(durationNum) || durationNum <= 0) {
        return res.status(400).json({ error: 'Duração inválida' })
      }

      if (!Number.isFinite(priceNum) || priceNum <= 0) {
        return res.status(400).json({ error: 'Preço inválido' })
      }

      const id = Date.now().toString()

      const newService = {
        id,
        name,
        description: description || '',
        duration: durationNum,
        price: priceNum,
        createdAt: new Date()
      }

      servicesMemory.push(newService)
      console.log('✅ Serviço criado:', newService)

      res.status(201).json(newService)
    } catch (error) {
      console.error('❌ Erro ao criar serviço:', error)
      res.status(500).json({ error: error.message })
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params
      const { name, description, duration, price } = req.body
      
      const index = servicesMemory.findIndex(s => s.id === id)
      if (index < 0) {
        return res.status(404).json({ error: 'Serviço não encontrado' })
      }

      const updatedService = {
        ...servicesMemory[index],
        name: name || servicesMemory[index].name,
        description: description !== undefined ? description : servicesMemory[index].description,
        duration: duration !== undefined ? parseInt(duration) : servicesMemory[index].duration,
        price: price !== undefined ? parseFloat(price) : servicesMemory[index].price,
        updatedAt: new Date()
      }

      servicesMemory[index] = updatedService
      console.log('✅ Serviço atualizado:', updatedService)
      
      res.json(updatedService)
    } catch (error) {
      console.error('❌ Erro ao atualizar serviço:', error)
      res.status(500).json({ error: error.message })
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params
      const index = servicesMemory.findIndex(s => s.id === id)
      if (index < 0) {
        return res.status(404).json({ error: 'Serviço não encontrado' })
      }

      const deleted = servicesMemory.splice(index, 1)
      console.log('✅ Serviço deletado:', deleted[0])

      res.json({ message: 'Serviço deletado', deletedService: deleted[0] })
    } catch (error) {
      console.error('❌ Erro ao deletar serviço:', error)
      res.status(500).json({ error: error.message })
    }
  }
}

export default serviceController
