import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const apiService = {
  // Barbeiros
  getBarbers: () => api.get('/barbers').then(res => res.data),
  getBarber: (id) => api.get(`/barbers/${id}`).then(res => res.data),
  createBarber: (data) => api.post('/barbers', data).then(res => res.data),
  updateBarber: (id, data) => api.put(`/barbers/${id}`, data).then(res => res.data),
  deleteBarber: (id) => api.delete(`/barbers/${id}`).then(res => res.data),
  
  // Serviços
  getServices: () => api.get('/services').then(res => res.data),
  getService: (id) => api.get(`/services/${id}`).then(res => res.data),
  createService: (data) => api.post('/services', data).then(res => res.data),
  updateService: (id, data) => api.put(`/services/${id}`, data).then(res => res.data),
  deleteService: (id) => api.delete(`/services/${id}`).then(res => res.data),
  
  // Disponibilidade
  getAvailability: (barberId, date) => api.get(`/bookings/availability/${barberId}/${date.split('T')[0]}`).then(res => res.data),
  
  // Agendamentos
  createBooking: (data) => api.post('/bookings', data).then(res => res.data),
  getBooking: (id) => api.get(`/bookings/${id}`).then(res => res.data),
  cancelBooking: (bookingId, reason, userPhone) => api.post(`/bookings/cancel/${bookingId}`, { reason, userPhone }).then(res => res.data),
  getAllBookings: () => api.get('/bookings/admin/all-bookings').then(res => res.data),
  getBookingsByStatus: (status) => api.get(`/bookings/admin/status/${status}`).then(res => res.data),
  
  // Pagamentos
  createPaymentIntent: (bookingId, amount, description) => api.post('/bookings/payment/create-intent', { bookingId, amount, description }).then(res => res.data),
  confirmPayment: (paymentId, token) => api.post('/bookings/payment/confirm', { paymentId, token }).then(res => res.data),
  refundPayment: (paymentId, reason) => api.post('/bookings/payment/refund', { paymentId, reason }).then(res => res.data),
  getPaymentHistory: (bookingId) => api.get(`/bookings/payment/history/${bookingId}`).then(res => res.data),
  getAllPayments: () => api.get('/bookings/admin/payments/all').then(res => res.data),
  getPaymentReport: (startDate, endDate) => api.get('/bookings/admin/payments/report', { params: { startDate, endDate } }).then(res => res.data),
  
  // Usuários
  getUserProfile: () => api.get('/users/profile').then(res => res.data),
  updateUserProfile: (data) => api.put('/users/profile', data).then(res => res.data),
}

export default api
