import { v4 as uuidv4 } from 'uuid'
import { db } from '../config/firebase.js'
import whatsappService from './whatsapp.js'
import googleCalendarService from './calendar.js'

export const bookingService = {
  createBooking: async (barberId, userId, serviceId, date, time, userPhone, userEmail) => {
    try {
      const bookingId = uuidv4()
      const barberRef = db.collection('barbers').doc(barberId)
      const serviceRef = db.collection('services').doc(serviceId)
      const userRef = db.collection('users').doc(userId)

      const [barberSnap, serviceSnap, userSnap] = await Promise.all([
        barberRef.get(),
        serviceRef.get(),
        userRef.get()
      ])

      if (!barberSnap.exists || !serviceSnap.exists) {
        throw new Error('Barbeiro ou serviço não encontrado')
      }

      const barber = barberSnap.data()
      const service = serviceSnap.data()
      const user = userSnap.data()

      // Formatar data e hora
      const bookingDate = new Date(`${date}T${time}`)
      const endTime = new Date(bookingDate.getTime() + service.duration * 60000)

      const bookingData = {
        id: bookingId,
        barberId,
        userId,
        serviceId,
        date: bookingDate,
        time,
        endTime,
        status: 'confirmed',
        userPhone,
        userEmail,
        barberName: barber.name,
        serviceName: service.name,
        price: service.price,
        createdAt: new Date()
      }

      // Salvar agendamento no Firestore
      await db.collection('bookings').doc(bookingId).set(bookingData)

      // Enviar notificação WhatsApp ao cliente
      if (userPhone) {
        await whatsappService.sendBookingConfirmation(
          userPhone,
          barber.name,
          service.name,
          new Date(bookingDate).toLocaleDateString('pt-BR'),
          time
        )
      }

      // Adicionar ao Google Calendar do barbeiro
      if (barber.email) {
        try {
          await googleCalendarService.addEvent(
            barber.email,
            `Agendamento: ${user?.name || 'Cliente'}`,
            `Serviço: ${service.name}\nCliente: ${user?.name || 'Sem nome'}\nTelefone: ${userPhone}`,
            bookingDate.toISOString(),
            endTime.toISOString()
          )
        } catch (calendarError) {
          console.error('Erro ao adicionar ao calendário:', calendarError)
          // Continuar mesmo se o calendário falhar
        }
      }

      return bookingData
    } catch (error) {
      console.error('Erro ao criar agendamento:', error)
      throw error
    }
  },

  getBooking: async (bookingId) => {
    try {
      const doc = await db.collection('bookings').doc(bookingId).get()
      if (!doc.exists) throw new Error('Agendamento não encontrado')
      return doc.data()
    } catch (error) {
      console.error('Erro ao buscar agendamento:', error)
      throw error
    }
  },

  getUserBookings: async (userId) => {
    try {
      const snapshot = await db.collection('bookings')
        .where('userId', '==', userId)
        .orderBy('date', 'desc')
        .get()
      return snapshot.docs.map(doc => doc.data())
    } catch (error) {
      console.error('Erro ao buscar agendamentos do usuário:', error)
      throw error
    }
  },

  // ============================================================
  // CANCELAMENTO DE AGENDAMENTOS
  // ============================================================

  cancelBooking: async (bookingId, reason, userPhone) => {
    try {
      const bookingRef = db.collection('bookings').doc(bookingId)
      const bookingSnap = await bookingRef.get()

      if (!bookingSnap.exists) {
        throw new Error('Agendamento não encontrado')
      }

      const booking = bookingSnap.data()

      // Verificar se já foi cancelado
      if (booking.status === 'cancelled') {
        throw new Error('Agendamento já foi cancelado')
      }

      // Atualizar status para cancelado
      await bookingRef.update({
        status: 'cancelled',
        cancelledAt: new Date(),
        cancelReason: reason,
        cancelledBy: 'admin'
      })

      // Se houve pagamento, reembolsar
      if (booking.paymentStatus === 'paid') {
        const paymentRef = db.collection('payments').doc(booking.paymentId)
        await paymentRef.update({
          status: 'refunded',
          refundReason: reason,
          refundedAt: new Date()
        })
      }

      // Enviar WhatsApp de cancelamento
      if (userPhone) {
        await whatsappService.sendCancellationMessage(
          userPhone,
          booking.barberName,
          booking.serviceName,
          new Date(booking.date).toLocaleDateString('pt-BR'),
          booking.time,
          reason
        )
      }

      // Remover do Google Calendar
      if (booking.eventId) {
        try {
          await googleCalendarService.removeEvent(booking.eventId)
        } catch (calendarError) {
          console.error('Erro ao remover do calendário:', calendarError)
        }
      }

      return { success: true, message: 'Agendamento cancelado com sucesso', booking: bookingSnap.data() }
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error)
      throw error
    }
  },

  /**
   * Obter todos os agendamentos (para admin)
   */
  getAllBookings: async () => {
    try {
      const snapshot = await db.collection('bookings')
        .orderBy('date', 'desc')
        .get()
      return snapshot.docs.map(doc => doc.data())
    } catch (error) {
      console.error('Erro ao buscar todos agendamentos:', error)
      throw error
    }
  },

  /**
   * Obter agendamentos por status
   */
  getBookingsByStatus: async (status) => {
    try {
      const snapshot = await db.collection('bookings')
        .where('status', '==', status)
        .orderBy('date', 'desc')
        .get()
      return snapshot.docs.map(doc => doc.data())
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error)
      throw error
    }
  },

  /**
   * Obter agendamentos por barbeiro
   */
  getBarberBookings: async (barberId) => {
    try {
      const snapshot = await db.collection('bookings')
        .where('barberId', '==', barberId)
        .orderBy('date', 'desc')
        .get()
      return snapshot.docs.map(doc => doc.data())
    } catch (error) {
      console.error('Erro ao buscar agendamentos do barbeiro:', error)
      throw error
    }
  }
}

export default bookingService
