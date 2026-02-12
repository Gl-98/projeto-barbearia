import twilio from 'twilio'
import dotenv from 'dotenv'

dotenv.config()

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export const whatsappService = {
  sendMessage: async (phoneNumber, message) => {
    try {
      const result = await client.messages.create({
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${phoneNumber}`,
        body: message
      })
      return result
    } catch (error) {
      console.error('Erro ao enviar mensagem WhatsApp:', error)
      throw error
    }
  },

  sendBookingConfirmation: async (phoneNumber, barberName, serviceName, date, time) => {
    const message = `✅ *Seu agendamento foi confirmado!*\n\n🪒 Barbeiro: ${barberName}\n💇 Serviço: ${serviceName}\n📅 Data: ${date}\n⏰ Horário: ${time}\n\nObrigado por escolher nossa barbearia!`
    return whatsappService.sendMessage(phoneNumber, message)
  }
}

export default whatsappService
