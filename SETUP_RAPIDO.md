# 🚀 Guia Rápido de Configuração

Este guia te ajudará a configurar o projeto em 10 minutos!

## Passo 1: Clonar/Abrir o Projeto

```bash
cd projeto-barbearia
```

## Passo 2: Configurar Firebase (5 min)

### 2.1 Criar Projeto Firebase
1. Acesse: https://console.firebase.google.com
2. Clique em "Adicionar projeto"
3. Nome: `barbearia-booking`
4. Clique em "Criar projeto"

### 2.2 Ativar Autenticação por Telefone
1. No menu lateral, vá em **Autenticação**
2. Clique em **Começar**
3. Procure por **Telefone**
4. Ative-o
5. Copie suas credenciais em **Configurações do projeto > Geral**

### 2.3 Criar Banco Firestore
1. No menu lateral, vá em **Firestore Database**
2. Clique em **Criar banco de dados**
3. Escolha **Começar no modo teste**
4. Selecione região: **South America (São Paulo)**

### 2.4 Gerar Chave de Serviço
1. Vá em **Configurações do projeto > Contas de serviço**
2. Clique em **Gerar chave privada**
3. Baixe o arquivo JSON

## Passo 3: Configurar Twilio (3 min)

### 3.1 Criar Conta
1. Acesse: https://www.twilio.com/try-twilio
2. Crie uma conta (é GRÁTIS)
3. Confirme o email

### 3.2 Habilitar WhatsApp Sandbox
1. No dashboard, vá em **Messaging > Try it out > Send a WhatsApp message**
2. Copie seu `ACCOUNT_SID` e `AUTH_TOKEN`
3. O número de WhatsApp será: `+14155238886`

## Passo 4: Configurar Google Calendar (2 min)

### 4.1 Criar Projeto Google Cloud
1. Acesse: https://console.cloud.google.com
2. Crie um novo projeto: `barbearia-booking`
3. Vá em **APIs e Serviços > Biblioteca**
4. Procure por "Google Calendar API"
5. Clique em **Ativar**

### 4.2 Criar Chave de Serviço
1. Vá em **Credenciais**
2. Clique em **Criar credenciais > Conta de serviço**
3. Preencha os dados e clique em **Criar**
4. Vá em **Chaves > Adicionar chave > JSON**
5. Baixe o arquivo

## Passo 5: Configurar Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
```

Edite `.env.local` e adicione suas credenciais Firebase:

```env
VITE_FIREBASE_API_KEY=sua_chave_api
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_id
VITE_FIREBASE_APP_ID=seu_app_id
```

## Passo 6: Configurar Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edite `.env` e adicione:

```env
PORT=5000
FIREBASE_PROJECT_ID=seu_projeto
FIREBASE_SERVICE_ACCOUNT='{"type":"service_account",...}'
TWILIO_ACCOUNT_SID=seu_sid
TWILIO_AUTH_TOKEN=seu_token
TWILIO_WHATSAPP_NUMBER=+14155238886
GOOGLE_CALENDAR_KEY_FILE=./google-calendar-key.json
```

> Copie todo o conteúdo do arquivo JSON do Firebase Service Account para `FIREBASE_SERVICE_ACCOUNT`

## Passo 7: Rodar o Projeto

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Abra: http://localhost:3000

## 🧪 Testando o App

### 1. Login
- Acesse http://localhost:3000
- Insira seu número de telefone com código do país: `+5511987654321`
- Digite o código que receber via SMS

### 2. Adicionar Dados de Teste

Execute isso no backend (em outra aba, usando curl ou Postman):

```bash
# Criar um barbeiro
curl -X POST http://localhost:5000/api/barbers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@barbearia.com",
    "phone": "+55 11 98765-4321",
    "rating": 4.8,
    "initials": "JS"
  }'

# Criar um serviço
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Corte de Cabelo",
    "description": "Corte tradicional",
    "duration": 30,
    "price": 50
  }'
```

### 3. Testar Agendamento
- Selecione o barbeiro
- Escolha o serviço
- Escolha data e hora
- Confirme

Você deve receber uma mensagem no WhatsApp!

## ✅ Checklist Final

- [ ] Firebase configurado
- [ ] Twilio configurado
- [ ] Google Calendar API configurada
- [ ] Frontend rodando em :3000
- [ ] Backend rodando em :5000
- [ ] Dados de teste criados
- [ ] Teste de agendamento funcionando

## 🆘 Troubleshooting

### Erro: "Token não fornecido"
- Certifique-se de estar logado
- Verifique as credenciais Firebase no `.env.local`

### Erro: "Barbeiro não encontrado"
- Crie um barbeiro usando o curl acima
- Verifique o Firebase Firestore

### Erro de WhatsApp
- Confirme que o Twilio Sandbox está ativado
- Adicione seu número ao Sandbox em: https://www.twilio.com/console/sms/whatsapp/sandbox

### Erro: CORS
- Verifique se o backend está rodando em :5000
- Reinicie o frontend

## 📚 Próximos Passos

1. Customizar cores e logo
2. Adicionar mais funcionalidades
3. Deploy em produção (Vercel + Render)
4. Integrar pagamento (Stripe/Mercado Pago)
5. Admin dashboard para gerenciar barbeiros

---

Pronto! 🎉 Seu app está funcionando!
