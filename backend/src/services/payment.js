import { db } from '../config/firebase.js'
import { v4 as uuidv4 } from 'uuid'

// ============================================================
// SERVIÇO DE PAGAMENTO COM STRIPE
// ============================================================

export const paymentService = {
  /**
   * Criar intenção de pagamento (Stripe Payment Intent)
   * Para testes, use: 4242 4242 4242 4242
   */
  createPaymentIntent: async (bookingId, amount, description) => {
    try {
      // Simular resposta do Stripe (em produção, integrar SDK)
      const paymentId = uuidv4()
      
      const paymentData = {
        id: paymentId,
        bookingId,
        amount, // em centavos
        amountFormatted: (amount / 100).toFixed(2),
        description,
        status: 'pending',
        method: 'card',
        currency: 'BRL',
        createdAt: new Date()
      }

      // Salvar no Firestore
      await db.collection('payments').doc(paymentId).set(paymentData)
      
      return paymentData
    } catch (error) {
      throw new Error(`Erro ao criar intenção de pagamento: ${error.message}`)
    }
  },

  /**
   * Confirmar pagamento (simular confirmação do Stripe)
   */
  confirmPayment: async (paymentId, token) => {
    try {
      const paymentRef = db.collection('payments').doc(paymentId)
      const paymentSnap = await paymentRef.get()

      if (!paymentSnap.exists) {
        throw new Error('Pagamento não encontrado')
      }

      // Atualizar status para confirmado
      await paymentRef.update({
        status: 'completed',
        token,
        confirmedAt: new Date()
      })

      // Atualizar status do agendamento
      const payment = paymentSnap.data()
      const bookingRef = db.collection('bookings').doc(payment.bookingId)
      await bookingRef.update({
        paymentStatus: 'paid',
        paymentId
      })

      return paymentSnap.data()
    } catch (error) {
      throw new Error(`Erro ao confirmar pagamento: ${error.message}`)
    }
  },

  /**
   * Obter histórico de pagamentos
   */
  getPaymentHistory: async (bookingId) => {
    try {
      const snapshot = await db.collection('payments')
        .where('bookingId', '==', bookingId)
        .orderBy('createdAt', 'desc')
        .get()

      return snapshot.docs.map(doc => doc.data())
    } catch (error) {
      throw new Error(`Erro ao buscar histórico: ${error.message}`)
    }
  },

  /**
   * Reembolsar pagamento
   */
  refundPayment: async (paymentId, reason) => {
    try {
      const paymentRef = db.collection('payments').doc(paymentId)
      const paymentSnap = await paymentRef.get()

      if (!paymentSnap.exists) {
        throw new Error('Pagamento não encontrado')
      }

      const payment = paymentSnap.data()

      // Atualizar status para reembolsado
      await paymentRef.update({
        status: 'refunded',
        refundReason: reason,
        refundedAt: new Date()
      })

      // Atualizar agendamento
      const bookingRef = db.collection('bookings').doc(payment.bookingId)
      await bookingRef.update({
        paymentStatus: 'refunded'
      })

      return paymentSnap.data()
    } catch (error) {
      throw new Error(`Erro ao reembolsar: ${error.message}`)
    }
  },

  /**
   * Listar todos os pagamentos
   */
  getAllPayments: async () => {
    try {
      const snapshot = await db.collection('payments')
        .orderBy('createdAt', 'desc')
        .get()

      return snapshot.docs.map(doc => doc.data())
    } catch (error) {
      throw new Error(`Erro ao listar pagamentos: ${error.message}`)
    }
  },

  /**
   * Obter relatório de pagamentos
   */
  getPaymentReport: async (startDate, endDate) => {
    try {
      const snapshot = await db.collection('payments')
        .where('createdAt', '>=', new Date(startDate))
        .where('createdAt', '<=', new Date(endDate))
        .get()

      const payments = snapshot.docs.map(doc => doc.data())
      
      const totals = {
        total: payments.length,
        completed: payments.filter(p => p.status === 'completed').length,
        pending: payments.filter(p => p.status === 'pending').length,
        refunded: payments.filter(p => p.status === 'refunded').length,
        totalAmount: payments
          .filter(p => p.status === 'completed')
          .reduce((sum, p) => sum + p.amount, 0) / 100
      }

      return { payments, totals }
    } catch (error) {
      throw new Error(`Erro ao gerar relatório: ${error.message}`)
    }
  }
}

export default paymentService
