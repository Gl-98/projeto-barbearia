import { useLocation, useNavigate } from 'react-router-dom'
import './ConfirmationPage.css'

export default function ConfirmationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const bookingData = location.state?.booking

  if (!bookingData) {
    return (
      <div className="confirmation-page">
        <div className="confirmation-container">
          <h1>❌ Erro</h1>
          <p>Dados do agendamento não encontrados</p>
          <button onClick={() => navigate('/booking')}>Voltar ao Agendamento</button>
        </div>
      </div>
    )
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="success-icon">✅</div>
        <h1>Agendamento Confirmado!</h1>
        
        <div className="confirmation-details">
          <div className="detail-row">
            <span className="label">ID do Agendamento:</span>
            <span className="value">{bookingData.id}</span>
          </div>
          <div className="detail-row">
            <span className="label">Barbeiro:</span>
            <span className="value">{bookingData.barberName}</span>
          </div>
          <div className="detail-row">
            <span className="label">Serviço:</span>
            <span className="value">{bookingData.serviceName}</span>
          </div>
          <div className="detail-row">
            <span className="label">Data:</span>
            <span className="value">{new Date(bookingData.date).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="detail-row">
            <span className="label">Horário:</span>
            <span className="value">{bookingData.time}</span>
          </div>
          <div className="detail-row">
            <span className="label">Valor:</span>
            <span className="value price">R$ {bookingData.price.toFixed(2)}</span>
          </div>
        </div>

        <div className="notification-info">
          <p>✉️ Um confirmação foi enviada para o seu WhatsApp!</p>
          <p>📅 O barbeiro também foi notificado pelo nosso sistema.</p>
        </div>

        <div className="actions">
          <button className="primary-btn" onClick={() => navigate('/booking')}>
            Fazer Novo Agendamento
          </button>
          <button className="secondary-btn" onClick={() => window.print()}>
            Imprimir Comprovante
          </button>
        </div>
      </div>
    </div>
  )
}
