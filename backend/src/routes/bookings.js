import express from 'express'
import bookingController from '../controllers/booking.js'
import authMiddleware from '../middleware/auth.js'
import adminMiddleware from '../middleware/admin.js'

const router = express.Router()

// Rotas públicas
router.post('/', authMiddleware, bookingController.create)
router.get('/:id', authMiddleware, bookingController.getById)
router.get('/user/bookings', authMiddleware, bookingController.getUserBookings)
router.get('/availability/:barberId/:date', bookingController.getAvailability)

// Rotas de cancelamento
router.post('/cancel/:bookingId', authMiddleware, bookingController.cancelBooking)

// Rotas de pagamento
router.post('/payment/create-intent', authMiddleware, bookingController.createPaymentIntent)
router.post('/payment/confirm', authMiddleware, bookingController.confirmPayment)
router.post('/payment/refund', adminMiddleware, bookingController.refundPayment)
router.get('/payment/history/:bookingId', authMiddleware, bookingController.getPaymentHistory)

// Rotas de ADMIN
router.get('/admin/all-bookings', adminMiddleware, bookingController.getAllBookings)
router.get('/admin/status/:status', adminMiddleware, bookingController.getBookingsByStatus)
router.get('/admin/barber/:barberId', adminMiddleware, bookingController.getBarberBookings)
router.get('/admin/payments/all', adminMiddleware, bookingController.getAllPayments)
router.get('/admin/payments/report', adminMiddleware, bookingController.getPaymentReport)

export default router

