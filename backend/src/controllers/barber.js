import { db } from '../config/firebase.js'

// Armazenamento em memória para teste (será substituído por Firestore em produção)
let barbersMemory = [
  { id: '1', name: 'João Silva', email: 'joao@example.com', phone: '11999999999', rating: 4.8, initials: 'JS', createdAt: new Date() },
  { id: '2', name: 'Maria Santos', email: 'maria@example.com', phone: '11988888888', rating: 4.9, initials: 'MS', createdAt: new Date() }
]

export const barberController = {
  getAll: async (req, res) => {
    try {
      res.json(barbersMemory)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  getById: async (req, res) => {
    try {
      const barber = barbersMemory.find(b => b.id === req.params.id)
      if (!barber) return res.status(404).json({ error: 'Barbeiro não encontrado' })
      res.json(barber)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  create: async (req, res) => {
    try {
      const { name, email, phone, rating, initials } = req.body

      if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios' })
      }

      const id = Date.now().toString()
      
      const newBarber = {
        id,
        name,
        email,
        phone,
        rating: rating || 5,
        initials: initials || name.split(' ').map(n => n[0]).join(''),
        createdAt: new Date()
      }

      barbersMemory.push(newBarber)
      console.log('✅ Barbeiro criado:', newBarber)

      res.status(201).json(newBarber)
    } catch (error) {
      console.error('❌ Erro ao criar barbeiro:', error)
      res.status(500).json({ error: error.message })
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params
      const { name, email, phone, rating, initials } = req.body
      
      const index = barbersMemory.findIndex(b => b.id === id)
      if (index < 0) {
        return res.status(404).json({ error: 'Barbeiro não encontrado' })
      }

      const updatedBarber = {
        ...barbersMemory[index],
        name: name || barbersMemory[index].name,
        email: email || barbersMemory[index].email,
        phone: phone || barbersMemory[index].phone,
        rating: rating !== undefined ? rating : barbersMemory[index].rating,
        initials: initials || barbersMemory[index].initials,
        updatedAt: new Date()
      }

      barbersMemory[index] = updatedBarber
      console.log('✅ Barbeiro atualizado:', updatedBarber)
      
      res.json(updatedBarber)
    } catch (error) {
      console.error('❌ Erro ao atualizar barbeiro:', error)
      res.status(500).json({ error: error.message })
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params
      const index = barbersMemory.findIndex(b => b.id === id)
      if (index < 0) {
        return res.status(404).json({ error: 'Barbeiro não encontrado' })
      }

      const deleted = barbersMemory.splice(index, 1)
      console.log('✅ Barbeiro deletado:', deleted[0])

      res.json({ message: 'Barbeiro deletado', deletedBarber: deleted[0] })
    } catch (error) {
      console.error('❌ Erro ao deletar barbeiro:', error)
      res.status(500).json({ error: error.message })
    }
  }
}

export default barberController
