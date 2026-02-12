import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { apiService } from '../services/api'
import './AdminPage.css'

export default function AdminPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [error, setError] = useState('')

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin')
    if (adminStatus === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  const handleAdminLogin = (e) => {
    e.preventDefault()
    setError('')

    const ADMIN_PASSWORD = 'admin@barbearia123'

    if (adminPassword === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true')
      setIsLoggedIn(true)
      setAdminPassword('')
    } else {
      setError('Senha de admin incorreta')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    setIsLoggedIn(false)
    navigate('/login')
  }

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="admin-login-container">
          <h1>🔐 Acesso do Administrador</h1>
          <form onSubmit={handleAdminLogin}>
            <input
              type="password"
              placeholder="Digite a senha do admin"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            <button type="submit">Entrar</button>
          </form>
          {error && <p className="error">{error}</p>}
          <button onClick={() => navigate('/login')} className="btn-back">
            ← Voltar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <h2>⚙️ Admin</h2>
        <nav>
          <button
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={activeTab === 'barbers' ? 'active' : ''}
            onClick={() => setActiveTab('barbers')}
          >
            👨‍💼 Barbeiros
          </button>
          <button
            className={activeTab === 'services' ? 'active' : ''}
            onClick={() => setActiveTab('services')}
          >
            ✂️ Serviços
          </button>
          <button
            className={activeTab === 'bookings' ? 'active' : ''}
            onClick={() => setActiveTab('bookings')}
          >
            📅 Agendamentos
          </button>
          <button
            className={activeTab === 'payments' ? 'active' : ''}
            onClick={() => setActiveTab('payments')}
          >
            💳 Pagamentos
          </button>
          <button
            className={activeTab === 'cancellations' ? 'active' : ''}
            onClick={() => setActiveTab('cancellations')}
          >
            ❌ Cancelamentos
          </button>
          <button onClick={handleLogout} className="btn-logout">
            🚪 Sair
          </button>
        </nav>
      </div>

      <div className="admin-content">
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'barbers' && <AdminBarbers />}
        {activeTab === 'services' && <AdminServices />}
        {activeTab === 'bookings' && <AdminBookings />}
        {activeTab === 'payments' && <AdminPayments />}
        {activeTab === 'cancellations' && <AdminCancellations />}
      </div>
    </div>
  )
}

// ============================================================
// DASHBOARD
// ============================================================

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBarbers: 0,
    totalServices: 0,
    totalBookings: 0,
    totalPayments: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    pendingPayments: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const barbers = await apiService.getBarbers()
      const services = await apiService.getServices()
      setStats({
        totalBarbers: barbers?.length || 0,
        totalServices: services?.length || 0,
        totalBookings: 0,
        totalPayments: 0,
        confirmedBookings: 0,
        cancelledBookings: 0,
        pendingPayments: 0
      })
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="admin-section"><p>Carregando...</p></div>

  return (
    <div className="admin-section">
      <h2>📊 Dashboard</h2>
      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>👨‍💼 Barbeiros</h3>
          <p className="stat-number">{stats.totalBarbers}</p>
        </div>
        <div className="stat-card">
          <h3>✂️ Serviços</h3>
          <p className="stat-number">{stats.totalServices}</p>
        </div>
        <div className="stat-card">
          <h3>📅 Agendamentos</h3>
          <p className="stat-number">{stats.totalBookings}</p>
        </div>
        <div className="stat-card">
          <h3>💳 Pagamentos</h3>
          <p className="stat-number">{stats.totalPayments}</p>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// BARBEIROS
// ============================================================

function AdminBarbers() {
  const [barbers, setBarbers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rating: 4.5,
    initials: ''
  })

  useEffect(() => {
    loadBarbers()
  }, [])

  const loadBarbers = async () => {
    try {
      const data = await apiService.getBarbers()
      setBarbers(data || [])
    } catch (error) {
      console.error('Erro ao carregar barbeiros:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await apiService.updateBarber(editingId, formData)
      } else {
        await apiService.createBarber(formData)
      }
      setFormData({ name: '', email: '', phone: '', rating: 4.5, initials: '' })
      setEditingId(null)
      setShowForm(false)
      loadBarbers()
    } catch (error) {
      console.error('Erro ao salvar barbeiro:', error)
      alert('Erro ao salvar barbeiro')
    }
  }

  const handleEdit = (barber) => {
    setFormData(barber)
    setEditingId(barber.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja deletar este barbeiro?')) {
      try {
        await apiService.deleteBarber(id)
        loadBarbers()
      } catch (error) {
        console.error('Erro ao deletar:', error)
        alert('Erro ao deletar barbeiro')
      }
    }
  }

  if (loading) return <div className="admin-section"><p>Carregando...</p></div>

  return (
    <div className="admin-section">
      <h2>👨‍💼 Gerenciar Barbeiros</h2>
      <button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: '', email: '', phone: '', rating: 4.5, initials: '' }) }} className="btn-primary">
        {showForm ? '✕ Cancelar' : '+ Novo Barbeiro'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <input type="text" placeholder="Nome" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <input type="text" placeholder="Telefone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
          <input type="number" placeholder="Avaliação (0-5)" min="0" max="5" step="0.1" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })} />
          <input type="text" placeholder="Iniciais" value={formData.initials} onChange={(e) => setFormData({ ...formData, initials: e.target.value })} required />
          <button type="submit" className="btn-success">{editingId ? '💾 Atualizar' : '✨ Criar'}</button>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Avaliação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {barbers.map(barber => (
            <tr key={barber.id}>
              <td>{barber.name}</td>
              <td>{barber.email}</td>
              <td>{barber.phone}</td>
              <td>⭐ {barber.rating}</td>
              <td>
                <button onClick={() => handleEdit(barber)} className="btn-edit">✏️</button>
                <button onClick={() => handleDelete(barber.id)} className="btn-delete">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ============================================================
// SERVIÇOS
// ============================================================

function AdminServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 30,
    price: 50
  })

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const data = await apiService.getServices()
      setServices(data || [])
    } catch (error) {
      console.error('Erro ao carregar serviços:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const duration = Number(formData.duration)
      const price = Number(formData.price)

      if (!formData.name.trim()) {
        alert('Informe o nome do serviço')
        return
      }

      if (!Number.isFinite(duration) || duration <= 0) {
        alert('Informe uma duração válida (minutos)')
        return
      }

      if (!Number.isFinite(price) || price <= 0) {
        alert('Informe um preço válido')
        return
      }

      const payload = { ...formData, duration, price }

      if (editingId) {
        await apiService.updateService(editingId, payload)
      } else {
        await apiService.createService(payload)
      }
      setFormData({ name: '', description: '', duration: 30, price: 50 })
      setEditingId(null)
      setShowForm(false)
      loadServices()
    } catch (error) {
      console.error('Erro ao salvar serviço:', error)
      alert('Erro ao salvar serviço')
    }
  }

  const handleEdit = (service) => {
    setFormData(service)
    setEditingId(service.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja deletar este serviço?')) {
      try {
        await apiService.deleteService(id)
        loadServices()
      } catch (error) {
        console.error('Erro ao deletar:', error)
        alert('Erro ao deletar serviço')
      }
    }
  }

  if (loading) return <div className="admin-section"><p>Carregando...</p></div>

  return (
    <div className="admin-section">
      <h2>✂️ Gerenciar Serviços</h2>
      <button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: '', description: '', duration: 30, price: 50 }) }} className="btn-primary">
        {showForm ? '✕ Cancelar' : '+ Novo Serviço'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <input type="text" placeholder="Nome" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <textarea placeholder="Descrição" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <input type="number" placeholder="Duração (minutos)" min="1" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })} required />
          <input type="number" placeholder="Preço (R$)" min="0.01" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })} required />
          <button type="submit" className="btn-success">{editingId ? '💾 Atualizar' : '✨ Criar'}</button>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Duração</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>{service.duration}min</td>
              <td>R$ {parseFloat(service.price).toFixed(2)}</td>
              <td>
                <button onClick={() => handleEdit(service)} className="btn-edit">✏️</button>
                <button onClick={() => handleDelete(service.id)} className="btn-delete">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ============================================================
// AGENDAMENTOS
// ============================================================

function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadBookings()
  }, [filter])

  const loadBookings = async () => {
    try {
      setBookings([])
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="admin-section"><p>Carregando...</p></div>

  return (
    <div className="admin-section">
      <h2>📅 Agendamentos</h2>
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>Todos</button>
        <button onClick={() => setFilter('confirmed')} className={filter === 'confirmed' ? 'active' : ''}>✅ Confirmados</button>
        <button onClick={() => setFilter('cancelled')} className={filter === 'cancelled' ? 'active' : ''}>❌ Cancelados</button>
      </div>

      {bookings.length === 0 ? (
        <p className="info-text">Nenhum agendamento encontrado</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Barbeiro</th>
              <th>Serviço</th>
              <th>Data/Hora</th>
              <th>Status</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.userEmail || 'Sem info'}</td>
                <td>{booking.barberName}</td>
                <td>{booking.serviceName}</td>
                <td>{booking.date} {booking.time}</td>
                <td className={`status-${booking.status}`}>{booking.status}</td>
                <td>R$ {parseFloat(booking.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

// ============================================================
// PAGAMENTOS
// ============================================================

function AdminPayments() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPayments()
  }, [])

  const loadPayments = async () => {
    try {
      setPayments([])
    } catch (error) {
      console.error('Erro ao carregar pagamentos:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="admin-section"><p>Carregando...</p></div>

  return (
    <div className="admin-section">
      <h2>💳 Pagamentos</h2>
      <p className="info-text">Integração Stripe - Visualize e gerencie todos os pagamentos</p>

      {payments.length === 0 ? (
        <p className="info-text">Nenhum pagamento realizado</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Agendamento</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.bookingId}</td>
                <td>R$ {payment.amount}</td>
                <td className={`status-${payment.status}`}>{payment.status}</td>
                <td>{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

// ============================================================
// CANCELAMENTOS
// ============================================================

function AdminCancellations() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [cancelReason, setCancelReason] = useState('')
  const [selectedBooking, setSelectedBooking] = useState(null)

  useEffect(() => {
    loadActiveBookings()
  }, [])

  const loadActiveBookings = async () => {
    try {
      setBookings([])
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelBooking = async (bookingId, userPhone) => {
    if (!cancelReason.trim()) {
      alert('Por favor, insira o motivo do cancelamento')
      return
    }

    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
      try {
        setCancelReason('')
        setSelectedBooking(null)
        loadActiveBookings()
        alert('Agendamento cancelado com sucesso')
      } catch (error) {
        console.error('Erro ao cancelar:', error)
        alert('Erro ao cancelar agendamento')
      }
    }
  }

  if (loading) return <div className="admin-section"><p>Carregando...</p></div>

  return (
    <div className="admin-section">
      <h2>❌ Cancelar Agendamentos</h2>
      <p className="info-text">Selecione um agendamento confirmado para cancelar</p>

      {bookings.length === 0 ? (
        <p className="info-text">Nenhum agendamento confirmado para cancelar</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Barbeiro</th>
              <th>Serviço</th>
              <th>Data/Hora</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.userEmail || 'Sem info'}</td>
                <td>{booking.barberName}</td>
                <td>{booking.serviceName}</td>
                <td>{booking.date} {booking.time}</td>
                <td>
                  <button onClick={() => setSelectedBooking(booking)} className="btn-edit">
                    ❌ Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedBooking && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Cancelar Agendamento</h3>
            <p><strong>Cliente:</strong> {selectedBooking.userEmail}</p>
            <p><strong>Barbeiro:</strong> {selectedBooking.barberName}</p>
            <p><strong>Data:</strong> {selectedBooking.date} {selectedBooking.time}</p>
            
            <textarea
              placeholder="Motivo do cancelamento..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              rows="4"
            />

            <div className="modal-buttons">
              <button onClick={() => handleCancelBooking(selectedBooking.id, selectedBooking.userPhone)} className="btn-danger">
                🗑️ Confirmar Cancelamento
              </button>
              <button onClick={() => { setSelectedBooking(null); setCancelReason('') }} className="btn-secondary">
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

