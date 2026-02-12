# Exemplo de Arquivos .env para Referência

## ⚠️ IMPORTANTE: NUNCA faça COMMIT desses arquivos!

Use estes como referência para criar seus próprios `.env` e `.env.local`

---

## Frontend - `.env.local` (Exemplo)

```env
# Firebase Credentials
# Encontre em: Firebase Console > Project Settings > Web API Configuration

VITE_FIREBASE_API_KEY=AIzaSyDaP3F7qKz9mL2nOp3qRs4tUvWxYz1a2bC
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456ghi789jkl
```

### Como Encontrar:
1. Acesse Firebase Console
2. Clique em "Project Settings" ⚙️
3. Vá em "General"
4. Procure por "Your apps"
5. Clique no app Web (</>)
6. Copie o objeto de configuração

---

## Backend - `.env` (Exemplo)

```env
# Node
PORT=5000
NODE_ENV=development

# Firebase Admin SDK
# Obtenha em: Firebase Console > Project Settings > Service Accounts

FIREBASE_PROJECT_ID=seu-projeto
FIREBASE_SERVICE_ACCOUNT={
  "type": "service_account",
  "project_id": "seu-projeto",
  "private_key_id": "abc123def456",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk@seu-projeto.iam.gserviceaccount.com",
  "client_id": "123456789012345678901",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk%40seu-projeto.iam.gserviceaccount.com"
}

# Twilio WhatsApp
# Obtenha em: Twilio Console > Account Info

TWILIO_ACCOUNT_SID=ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+14155238886

# Google Calendar API
# Faça download do arquivo JSON em: Google Cloud Console > Service Accounts

GOOGLE_CALENDAR_KEY_FILE=./google-calendar-key.json
```

### Como Encontrar Firebase Service Account:

1. Acesse Firebase Console
2. Clique em "Project Settings" ⚙️
3. Vá em "Service Accounts"
4. Clique em "Generate New Private Key"
5. Um JSON será baixado
6. Copie TODO o conteúdo (inclui chaves privadas!)

### Como Encontrar Twilio Credentials:

1. Acesse Twilio Console
2. Clique em "Account Info"
3. Copie: `Account SID` e `Auth Token`
4. Vá em "Messaging > Services"
5. Use o WhatsApp Sandbox: `+14155238886`

### Como Encontrar Google Calendar:

1. Acesse Google Cloud Console
2. Crie um projeto
3. Ative a Google Calendar API
4. Crie uma Service Account
5. Baixe o arquivo JSON
6. Coloque em: `backend/google-calendar-key.json`

---

## Estrutura do JSON do Google Calendar

O arquivo `google-calendar-key.json` deve parecer assim:

```json
{
  "type": "service_account",
  "project_id": "seu-projeto-id",
  "private_key_id": "sua-chave-privada-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "seu-email@seu-projeto.iam.gserviceaccount.com",
  "client_id": "123456789012345678901",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
}
```

---

## Guia de Segurança

### ✅ Faça:
- [x] Colocar `.env` no `.gitignore`
- [x] Usar variáveis de ambiente em produção
- [x] Rotacionar chaves regularmente
- [x] Usar secrets do seu servidor de deploy

### ❌ NÃO Faça:
- [ ] Commitar arquivos .env
- [ ] Compartilhar chaves privadas
- [ ] Usar mesmas chaves em dev e prod
- [ ] Colocar credenciais em código

---

## Exemplo de Estrutura Final

```
backend/
├── .env              ← NÃO COMMITAR (seu arquivo local)
├── .env.example      ← COMMITAR (sem valores reais)
├── google-calendar-key.json  ← NÃO COMMITAR
└── src/
    └── server.js
```

```
frontend/
├── .env.local        ← NÃO COMMITAR (seu arquivo local)
├── .env.example      ← COMMITAR (sem valores reais)
└── src/
    └── App.jsx
```

---

## 🆘 Troubleshooting

### Erro: "FIREBASE_SERVICE_ACCOUNT is not valid JSON"
**Solução:** Certifique-se de que a chave JSON está completamente formatada e escapada corretamente.

### Erro: "Invalid Twilio credentials"
**Solução:** Copia `Account SID` e `Auth Token` do console Twilio sem espaços extras.

### Erro: "Cannot find google-calendar-key.json"
**Solução:** Coloque o arquivo na pasta `backend/` (raiz do projeto backend).

### Erro: "Invalid Firebase config"
**Solução:** Verifique se todos os campos do `.env.local` estão preenchidos corretamente.

---

## 📝 Checklist Antes de Rodar

- [ ] `.env.local` criado com credenciais Firebase
- [ ] `.env` criado com credenciais Twilio e Google
- [ ] `google-calendar-key.json` na pasta backend
- [ ] Nenhum arquivo `.env` ou `.json` foi commitado
- [ ] Todos os valores preenchidos (sem espaços extras)
- [ ] Verificou 2 vezes as chaves privadas

---

**Pronto! Agora você pode rodar `npm run dev` 🚀**
