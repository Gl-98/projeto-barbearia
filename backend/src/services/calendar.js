import { google } from 'googleapis'
import dotenv from 'dotenv'

dotenv.config()

const calendar = google.calendar('v3')

export const googleCalendarService = {
  authenticate: () => {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_CALENDAR_KEY_FILE,
      scopes: ['https://www.googleapis.com/auth/calendar']
    })
    return auth
  },

  addEvent: async (barberEmail, title, description, startTime, endTime) => {
    try {
      const auth = googleCalendarService.authenticate()
      
      const result = await calendar.events.insert(
        {
          auth,
          calendarId: barberEmail,
          resource: {
            summary: title,
            description,
            start: { dateTime: startTime, timeZone: 'America/Sao_Paulo' },
            end: { dateTime: endTime, timeZone: 'America/Sao_Paulo' },
            reminders: {
              useDefault: true
            }
          }
        }
      )
      return result.data
    } catch (error) {
      console.error('Erro ao adicionar evento ao calendário:', error)
      throw error
    }
  }
}

export default googleCalendarService
