import { db } from '../config/firebase.js'
import bookingService from '../services/booking.js'
import paymentService from '../services/payment.js'

export const bookingController = {
  create: async (req, res) => {
    try {
      const { barberId, serviceId, date, time } = req.body
      const userId = req.user.uid
      const userPhone = req.user.phone_number
      const userEmail = req.user.email

      const booking = await bookingService.createBooking(
        barberId,
        userId,
        serviceId,
        date,
        time,
        userPhone,
        userEmail
      )

      res.status(201).json(booking)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  getById: async (req, res) => {
    try {
      const booking = await bookingService.getBooking(req.params.id)
      res.json(booking)
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  },

  getUserBookings: async (req, res) => {
    try {
      const userId = req.user.uid
      const bookings = await bookingService.getUserBookings(userId)
      res.json(bookings)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  getAvailability: async (req, res) => {
    try {
      const { barberId, date } = req.params
      
      // Buscar agendamentos do barbeiro para o dia
      const snapshot = await db.collection('bookings')
        .where('barberId', '==', barberId)
        .where('date', '>=', new Date(`${date}T00:00:00`))
        .where('date', '<=', new Date(`${date}T23:59:59`))
        .get()

      const bookedTimes = snapshot.docs.map(doc => doc.data().time)

      // Horários disponíveis (8:00 às 18:00)
      const availableSlots = []
      for (let hour = 8; hour < 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
          if (!bookedTimes.includes(time)) {
            availableSlots.push({
              id: `${date}-${time}`,
              time
            })
          }
        }
      }

      res.json(availableSlots)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // ============================================================
  // CANCELAMENTO DE AGENDAMENTOS
  // ============================================================

  cancelBooking: async (req, res) => {
    try {
      const { bookingId, reason } = req.body
      const userPhone = req.body.userPhone

      const result = await bookingService.cancelBooking(bookingId, reason, userPhone)
      res.json(result)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  // ============================================================
  // FUNÇÕES PARA ADMIN
  // ============================================================

  getAllBookings: async (req, res) => {
    try {
      const bookings = await bookingService.getAllBookings()
      res.json(bookings)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  getBookingsByStatus: async (req, res) => {
    try {
      const { status } = req.params
      const bookings = await bookingService.getBookingsByStatus(status)
      res.json(bookings)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  getBarberBookings: async (req, res) => {
    try {
      const { barberId } = req.params
      const bookings = await bookingService.getBarberBookings(barberId)
      res.json(bookings)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // ============================================================
  // PAGAMENTOS
  // ============================================================

  createPaymentIntent: async (req, res) => {
    try {
      const { bookingId, amount, description } = req.body

      if (!bookingId || !amount) {
        return res.status(400).json({ error: 'bookingId e amount são obrigatórios' })
      }

      const payment = await paymentService.createPaymentIntent(bookingId, amount, description)
      res.status(201).json(payment)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  confirmPayment: async (req, res) => {
    try {
      const { paymentId, token } = req.body

      if (!paymentId || !token) {
        return res.status(400).json({ error: 'paymentId e token são obrigatórios' })
      }

      const payment = await paymentService.confirmPayment(paymentId, token)
      res.json({ success: true, payment })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  refundPayment: async (req, res) => {
    try {
      const { paymentId, reason } = req.body

      if (!paymentId) {
        return res.status(400).json({ error: 'paymentId é obrigatório' })
      }

      const result = await paymentService.refundPayment(paymentId, reason)
      res.json({ success: true, result })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  getPaymentHistory: async (req, res) => {
    try {
      const { bookingId } = req.params
      const history = await paymentService.getPaymentHistory(bookingId)
      res.json(history)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  getAllPayments: async (req, res) => {
    try {
      const payments = await paymentService.getAllPayments()
      res.json(payments)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  getPaymentReport: async (req, res) => {
    try {
      const { startDate, endDate } = req.query

      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate e endDate são obrigatórios' })
      }

      const report = await paymentService.getPaymentReport(startDate, endDate)
      res.json(report)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default bookingController
