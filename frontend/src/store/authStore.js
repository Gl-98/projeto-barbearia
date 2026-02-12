import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  clearUser: () => set({ user: null }),
}))

export const useBookingStore = create((set) => ({
  selectedBarber: null,
  selectedDate: null,
  selectedTime: null,
  selectedService: null,
  
  setSelectedBarber: (barber) => set({ selectedBarber: barber }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setSelectedService: (service) => set({ selectedService: service }),
  
  resetBooking: () => set({
    selectedBarber: null,
    selectedDate: null,
    selectedTime: null,
    selectedService: null,
  }),
}))
