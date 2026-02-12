import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBookingStore } from '../store/authStore'
import { apiService } from '../services/api'
import './BookingPage.css'

export default function BookingPage() {
  const navigate = useNavigate()
  const booking = useBookingStore()
  
  const [barbers, setBarbers] = useState([])
  const [services, setServices] = useState([])
  const [availability, setAvailability] = useState([])
  const [loadingBarbers, setLoadingBarbers] = useState(true)
  const [loadingServices, setLoadingServices] = useState(true)
  const [loadingAvailability, setLoadingAvailability] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  useEffect(() => {
    fetchBarbers()
    fetchServices()
  }, [])

  useEffect(() => {
    if (booking.selectedBarber && selectedDate) {
      fetchAvailability(booking.selectedBarber.id, selectedDate)
    }
  }, [booking.selectedBarber, selectedDate])

  const fetchBarbers = async () => {
    try {
      const { data } = await apiService.getBarbers()
      setBarbers(data)
    } catch (error) {
      console.error('Erro ao buscar barbeiros:', error)
    } finally {
      setLoadingBarbers(false)
    }
  }

  const fetchServices = async () => {
    try {
      const { data } = await apiService.getServices()
      setServices(data)
    } catch (error) {
      console.error('Erro ao buscar serviços:', error)
    } finally {
      setLoadingServices(false)
    }
  }

  const fetchAvailability = async (barberId, date) => {
    setLoadingAvailability(true)
    try {
      const { data } = await apiService.getAvailability(barberId, date)
      setAvailability(data)
    } catch (error) {
      console.error('Erro ao buscar disponibilidade:', error)
    } finally {
      setLoadingAvailability(false)
    }
  }

  const handleConfirmBooking = async () => {
    if (!booking.selectedBarber || !selectedDate || !booking.selectedTime || !booking.selectedService) {
      alert('Por favor, selecione todas as opções!')
      return
    }

    try {
      const response = await apiService.createBooking({
        barberId: booking.selectedBarber.id,
        date: selectedDate,
        time: booking.selectedTime,
        serviceId: booking.selectedService.id,
      })
      navigate('/confirmation', { state: { booking: response.data } })
    } catch (error) {
      alert('Erro ao confirmar agendamento: ' + error.message)
    }
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1>📅 Agendar Corte</h1>

        {/* Seleção de Barbeiro */}
        <div className="section">
          <h2>1. Escolha seu Barbeiro</h2>
          {loadingBarbers ? (
            <p>Carregando barbeiros...</p>
          ) : (
            <div className="barbers-grid">
              {barbers.map((barber) => (
                <div
                  key={barber.id}
                  className={`barber-card ${booking.selectedBarber?.id === barber.id ? 'selected' : ''}`}
                  onClick={() => booking.setSelectedBarber(barber)}
                >
                  <div className="barber-avatar">{barber.initials}</div>
                  <h3>{barber.name}</h3>
                  <p className="rating">⭐ {barber.rating}/5</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Seleção de Serviço */}
        <div className="section">
          <h2>2. Escolha o Serviço</h2>
          {loadingServices ? (
            <p>Carregando serviços...</p>
          ) : (
            <div className="services-grid">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`service-card ${booking.selectedService?.id === service.id ? 'selected' : ''}`}
                  onClick={() => booking.setSelectedService(service)}
                >
                  <h3>{service.name}</h3>
                  <p className="duration">{service.duration} min</p>
                  <p className="price">R$ {service.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Seleção de Data */}
        <div className="section">
          <h2>3. Escolha a Data</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Seleção de Hora */}
        {selectedDate && booking.selectedBarber && (
          <div className="section">
            <h2>4. Escolha o Horário</h2>
            {loadingAvailability ? (
              <p>Carregando horários disponíveis...</p>
            ) : availability.length > 0 ? (
              <div className="times-grid">
                {availability.map((slot) => (
                  <div
                    key={slot.id}
                    className={`time-slot ${booking.selectedTime === slot.time ? 'selected' : ''}`}
                    onClick={() => booking.setSelectedTime(slot.time)}
                  >
                    {slot.time}
                  </div>
                ))}
              </div>
            ) : (
              <p>Sem horários disponíveis nesta data</p>
            )}
          </div>
        )}

        {/* Resumo e Confirmar */}
        <div className="section summary">
          <h2>📋 Resumo do Agendamento</h2>
          <div className="summary-item">
            <span>Barbeiro:</span>
            <strong>{booking.selectedBarber?.name || 'Não selecionado'}</strong>
          </div>
          <div className="summary-item">
            <span>Serviço:</span>
            <strong>{booking.selectedService?.name || 'Não selecionado'}</strong>
          </div>
          <div className="summary-item">
            <span>Data:</span>
            <strong>{selectedDate ? new Date(selectedDate).toLocaleDateString('pt-BR') : 'Não selecionada'}</strong>
          </div>
          <div className="summary-item">
            <span>Horário:</span>
            <strong>{booking.selectedTime || 'Não selecionado'}</strong>
          </div>
          <div className="summary-item price">
            <span>Valor:</span>
            <strong>R$ {booking.selectedService?.price?.toFixed(2) || '0.00'}</strong>
          </div>

          <button 
            className="confirm-btn"
            onClick={handleConfirmBooking}
            disabled={!booking.selectedBarber || !selectedDate || !booking.selectedTime || !booking.selectedService}
          >
            ✅ Confirmar Agendamento
          </button>
        </div>
      </div>
    </div>
  )
}
