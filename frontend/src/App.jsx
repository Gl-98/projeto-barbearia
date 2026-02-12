import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { auth } from './services/firebase'
import { useAuthStore } from './store/authStore'
import LoginPage from './pages/LoginPage'
import BookingPage from './pages/BookingPage'
import ConfirmationPage from './pages/ConfirmationPage'
import AdminPage from './pages/AdminPage'
import './App.css'

function App() {
  const { setUser, loading } = useAuthStore()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({ id: user.uid, email: user.email, phone: user.phoneNumber })
      } else {
        setUser(null)
      }
    })
    return unsubscribe
  }, [setUser])

  if (loading) {
    return <div className="loading">Carregando...</div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
