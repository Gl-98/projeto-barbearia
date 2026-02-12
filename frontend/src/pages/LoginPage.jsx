import { useState } from 'react'
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import { auth } from '../services/firebase'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [step, setStep] = useState('phone') // 'phone' ou 'code'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setUser } = useAuthStore()

  const handlePhoneSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          console.log('reCAPTCHA verified')
        }
      }, auth)

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        recaptchaVerifier
      )
      window.confirmationResult = confirmationResult
      setStep('code')
    } catch (err) {
      setError('Erro ao enviar código: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCodeSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await window.confirmationResult.confirm(verificationCode)
      const user = result.user
      setUser({ id: user.uid, phone: user.phoneNumber })
      navigate('/booking')
    } catch (err) {
      setError('Código inválido: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>🪒 Barbearia Agendamento</h1>
        
        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit}>
            <input
              type="tel"
              placeholder="+55 (11) 98765-4321"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Código'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit}>
            <input
              type="text"
              placeholder="Código de 6 dígitos"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength="6"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Verificando...' : 'Confirmar Código'}
            </button>
            <button
              type="button"
              onClick={() => setStep('phone')}
              className="back-btn"
            >
              Voltar
            </button>
          </form>
        )}

        {error && <p className="error">{error}</p>}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  )
}
