# 🪒 Barbearia Booking - Aplicativo de Agendamento

Sistema completo de agendamento para barbearias com integração WhatsApp, Google Calendar e autenticação Firebase. Totalmente gratuito com APIs gratuitas.

## 🚀 Características

- ✅ **Autenticação por Telefone**: Firebase Phone Authentication (gratuito)
- ✅ **Seleção de Barbeiros**: Interface amigável com avaliações
- ✅ **Catálogo de Serviços**: Diferentes tipos de cortes com preços
- ✅ **Calendário Inteligente**: Disponibilidade em tempo real
- ✅ **Notificações WhatsApp**: Via Twilio Sandbox (gratuito)
- ✅ **Sincronização Google Calendar**: Agendamentos direto no calendário do barbeiro
- ✅ **Responsivo**: Funciona em desktop e mobile

## 📋 Stack Tecnológico

### Frontend
- React 18 + Vite
- React Router DOM
- Zustand (gerenciamento de estado)
- Firebase SDK
- Axios (requisições HTTP)
- CSS3 com Gradientes

### Backend
- Node.js + Express
- Firebase Admin SDK
- Twilio (WhatsApp)
- Google Calendar API
- CORS habilitado

### Banco de Dados & Autenticação
- **Firebase Firestore**: Banco de dados NoSQL (5GB gratuito)
- **Firebase Authentication**: Autenticação por telefone (gratuito)

### Integrações
- **Twilio Sandbox**: Envio de mensagens WhatsApp (gratuito)
- **Google Calendar API**: Sincronização de agendamentos (gratuito)

## 🛠️ Instalação

### Pré-requisitos
- Node.js 16+
- npm ou yarn
- Conta Firebase (gratuita)
- Conta Twilio (com sandbox WhatsApp)
- Conta Google Cloud (gratuita)

### 1. Configurar Firebase

1. Acesse [firebase.google.com](https://firebase.google.com)
2. Crie um novo projeto
3. Ative **Authentication** com "Telefone"
4. Crie um banco **Firestore**
5. Gere uma chave privada em: **Project Settings > Service Accounts**
6. Copie as credenciais

### 2. Configurar Twilio

1. Acesse [twilio.com](https://twilio.com) (conta gratuita)
2. Vá em **Messaging > Try it out > Send a WhatsApp message**
3. Use o Sandbox WhatsApp (número fornecido: +14155238886)
4. Copie: `ACCOUNT_SID`, `AUTH_TOKEN`, `SANDBOX_WHATSAPP_NUMBER`

### 3. Configurar Google Calendar API

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto
3. Ative a **Google Calendar API**
4. Crie uma chave de serviço (Service Account)
5. Baixe o arquivo JSON

### 4. Instalar Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais Firebase:
```
VITE_FIREBASE_API_KEY=sua_chave_api
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

### 5. Instalar Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edite `.env` com suas credenciais:
```
PORT=5000
FIREBASE_PROJECT_ID=seu_project_id
FIREBASE_SERVICE_ACCOUNT=seu_service_account_json
TWILIO_ACCOUNT_SID=seu_account_sid
TWILIO_AUTH_TOKEN=seu_auth_token
TWILIO_WHATSAPP_NUMBER=+14155238886
GOOGLE_CALENDAR_KEY_FILE=./google-calendar-key.json
```

## 🚀 Executando o Projeto

### Terminal 1 - Backend
```bash
cd backend
npm run dev
# Servidor rodará em http://localhost:5000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
# Aplicação rodará em http://localhost:3000
```

## 🌐 Deploy Profissional (Vercel + Render)

### Frontend (Vercel)
1. Crie um novo projeto no Vercel e selecione este repositório.
2. Defina o **Root Directory** como `frontend`.
3. Variáveis de ambiente no Vercel:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_BASE_URL=https://SEU-BACKEND.onrender.com/api
```

### Backend (Render)
1. Crie um novo **Web Service** no Render e selecione este repositório.
2. Defina o **Root Directory** como `backend`.
3. Build Command: `npm ci`
4. Start Command: `npm start`
5. Variáveis de ambiente no Render:

```
PORT=5000
NODE_ENV=production
FIREBASE_PROJECT_ID=
FIREBASE_SERVICE_ACCOUNT=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_NUMBER=
GOOGLE_CALENDAR_KEY_FILE=./google-calendar-key.json
ADMIN_SECRET_KEY=admin@barbearia123
```

> Observação: Para o Google Calendar, envie o arquivo JSON como secret no Render
> e ajuste `GOOGLE_CALENDAR_KEY_FILE` para o caminho configurado no serviço.

## 📚 Estrutura do Projeto

```
projeto-barbearia/
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas (Login, Booking, Confirmation)
│   │   ├── services/        # Integrações (API, Firebase)
│   │   ├── store/           # Zustand stores (auth, booking)
│   │   ├── App.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/          # Configurações (Firebase)
│   │   ├── controllers/     # Lógica de rotas
│   │   ├── services/        # Serviços (WhatsApp, Calendar, Booking)
│   │   ├── middleware/      # Middleware (Autenticação)
│   │   ├── routes/          # Definição de rotas
│   │   └── server.js
│   └── package.json
├── docs/
│   └── API.md               # Documentação da API
└── .github/
    └── copilot-instructions.md
```

## 🔌 API Endpoints

### Barbeiros
- `GET /api/barbers` - Listar todos os barbeiros
- `GET /api/barbers/:id` - Detalhes de um barbeiro
- `POST /api/barbers` - Criar novo barbeiro

### Serviços
- `GET /api/services` - Listar serviços
- `GET /api/services/:id` - Detalhes do serviço
- `POST /api/services` - Criar novo serviço

### Agendamentos
- `POST /api/bookings` - Criar agendamento (requer autenticação)
- `GET /api/bookings/:id` - Detalhes do agendamento (requer autenticação)
- `GET /api/bookings/user/bookings` - Meus agendamentos (requer autenticação)
- `GET /api/bookings/availability/:barberId/:date` - Horários disponíveis

### Barbeiros (Admin)
- `PUT /api/barbers/:id` - Editar barbeiro
- `DELETE /api/barbers/:id` - Deletar barbeiro

### Serviços (Admin)
- `PUT /api/services/:id` - Editar serviço
- `DELETE /api/services/:id` - Deletar serviço

## 📱 Fluxo do Usuário

### Cliente
1. **Login**: Usuário insere seu telefone
2. **Verificação**: Recebe código SMS via Firebase
3. **Seleção**: Escolhe barbeiro, serviço, data e hora
4. **Confirmação**: Submete agendamento
5. **Notificação**: Recebe confirmação via WhatsApp
6. **Calendário**: Barbeiro vê no seu Google Calendar

### 🔐 Administrador
Acesse: **http://localhost:3000/admin**

**Senha padrão:** `admin@barbearia123`

**Funcionalidades:**
- ✅ Dashboard com estatísticas
- ✅ Criar, editar e deletar barbeiros
- ✅ Criar, editar e deletar serviços
- ✅ Visualizar todos os agendamentos

👉 **Documentação completa:** [docs/ADMIN.md](docs/ADMIN.md)

## 🆓 Custos

- ✅ Firebase: GRATUITO (5GB storage, 1GB de banda)
- ✅ Twilio Sandbox: GRATUITO (para testes)
- ✅ Google Calendar: GRATUITO
- ✅ React + Node.js: GRATUITO
- 💰 Para produção: ~$5-20/mês dependendo do volume

## 🔐 Segurança

- Autenticação via JWT do Firebase
- Middleware de autenticação em rotas protegidas
- CORS configurado
- Variáveis de ambiente sensíveis

## 🚀 Deploy (Gratuito)

### Frontend - Vercel
```bash
npm install -g vercel
vercel
```

### Backend - Render.com ou Railway
- Conecte seu repositório GitHub
- Configure variáveis de ambiente
- Deploy automático

## 📞 Suporte

Para dúvidas sobre:
- **Firebase**: [firebase.google.com/docs](https://firebase.google.com/docs)
- **Twilio**: [twilio.com/docs](https://twilio.com/docs)
- **Google Calendar**: [developers.google.com/calendar](https://developers.google.com/calendar)

## 📄 Licença

MIT License - Sinta-se livre para usar e modificar!

---

Desenvolvido com ❤️ para barbearias
