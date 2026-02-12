# Instruções do Projeto - Barbearia Booking

## Visão Geral
Projeto completo de agendamento para barbearias com integração WhatsApp, Google Calendar e Firebase. Sistema totalmente funcional com APIs 100% GRATUITAS.

## Stack Tecnológico
- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Autenticação**: Firebase Phone Authentication
- **Banco de Dados**: Firebase Firestore (NoSQL)
- **WhatsApp**: Twilio Sandbox
- **Calendário**: Google Calendar API

## ✅ Etapas Completadas
- [x] Criar arquivo copilot-instructions.md
- [x] Scaffold do projeto React + Express
- [x] Customizar projeto com features completas
- [x] Estrutura de pastas organizada
- [x] Autenticação por telefone
- [x] Seleção de barbeiro e serviços
- [x] Calendário com horários disponíveis
- [x] Notificação WhatsApp
- [x] Sincronização Google Calendar
- [x] Documentação completa (README.md, API.md, SETUP_RAPIDO.md)

## 🚀 Como Começar

### Rápido (10 minutos)
1. Leia o arquivo [SETUP_RAPIDO.md](SETUP_RAPIDO.md)
2. Configure Firebase, Twilio e Google Calendar
3. Copie as credenciais para .env
4. Execute `npm install` e `npm run dev` em cada pasta

### Detalhado
1. Consulte [README.md](README.md) para documentação completa
2. Veja [docs/API.md](docs/API.md) para referência dos endpoints

## 📁 Estrutura do Projeto

```
├── frontend/           # React + Vite app
│   ├── src/
│   │   ├── pages/      # LoginPage, BookingPage, ConfirmationPage
│   │   ├── services/   # Firebase e API
│   │   ├── store/      # Zustand (autenticação e booking)
│   │   └── components/ # Componentes React
│   └── .env.example
├── backend/            # Express API
│   ├── src/
│   │   ├── controllers/  # Lógica de negócio
│   │   ├── services/     # Twilio, Calendar, Booking
│   │   ├── middleware/   # Autenticação JWT
│   │   ├── routes/       # Endpoints da API
│   │   └── config/       # Firebase
│   └── .env.example
├── docs/
│   └── API.md          # Documentação dos endpoints
├── README.md           # Documentação principal
└── SETUP_RAPIDO.md     # Guia rápido de configuração
```

## 🔑 Variáveis de Ambiente Necessárias

### Frontend (.env.local)
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

### Backend (.env)
```
PORT
FIREBASE_PROJECT_ID
FIREBASE_SERVICE_ACCOUNT
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_WHATSAPP_NUMBER
GOOGLE_CALENDAR_KEY_FILE
```

## 🧪 Testando Localmente

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

Acesse: http://localhost:3000

## 📞 Fluxo do Usuário

1. **Login** → Autentica por telefone (Firebase)
2. **Browse** → Seleciona barbeiro e serviço
3. **Schedule** → Escolhe data e horário
4. **Confirm** → Confirma agendamento
5. **Notify** → Recebe WhatsApp + Calendário atualizado

## 🆓 Custos

Totalmente GRATUITO:
- Firebase: 5GB storage
- Twilio: Sandbox (para testes)
- Google Calendar: API gratuita
- Node.js + React: Gratuito

Para produção: ~$5-20/mês

## 🎯 Próximas Features Sugeridas

- [ ] Cancelamento de agendamentos
- [ ] Histórico de agendamentos
- [ ] Sistema de avaliações
- [ ] Admin dashboard
- [ ] Pagamento online (Stripe)
- [ ] Notificações por email
- [ ] Aplicativo mobile (React Native)

## 📚 Referências

- [Firebase Docs](https://firebase.google.com/docs)
- [Twilio Docs](https://www.twilio.com/docs)
- [Google Calendar API](https://developers.google.com/calendar)
- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
