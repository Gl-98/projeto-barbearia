# 🚀 COMECE AQUI - Instruções de Inicialização

Seu projeto está **100% pronto**. Siga estes 4 passos para começar.

---

## 📖 Passo 1: Leia a Documentação (2 minutos)

Abra estes arquivos nesta ordem:

1. **PROJETO_COMPLETO.txt** ← Visual do projeto
2. **README.md** ← Documentação completa
3. **SETUP_RAPIDO.md** ← Configuração passo-a-passo

---

## 🔐 Passo 2: Configure as 3 Credenciais (10 minutos)

### A. Firebase (Google)
1. Acesse: https://console.firebase.google.com
2. Crie um novo projeto
3. Ative "Authentication" com "Telefone"
4. Crie "Firestore Database"
5. Em "Project Settings", copie as credenciais Web
6. Arquivo: `frontend/.env.local`

### B. Twilio (WhatsApp)
1. Acesse: https://www.twilio.com/try-twilio
2. Crie uma conta (gratuita)
3. Vá em "Messaging > WhatsApp Sandbox"
4. Copie seu Account SID e Auth Token
5. Arquivo: `backend/.env`

### C. Google Calendar
1. Acesse: https://console.cloud.google.com
2. Crie um novo projeto
3. Ative "Google Calendar API"
4. Crie uma "Service Account"
5. Baixe o arquivo JSON
6. Arquivo: `backend/google-calendar-key.json`

**👉 Veja detalhes em: [ENV_EXEMPLO.md](ENV_EXEMPLO.md)**

---

## ⚙️ Passo 3: Instale as Dependências (5 minutos)

Abra 2 terminais e execute:

### Terminal 1 - Frontend
```bash
cd frontend
npm install
```

### Terminal 2 - Backend
```bash
cd backend
npm install
```

---

## 🎯 Passo 4: Rode a Aplicação (1 minuto)

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Você verá:
```
🚀 Servidor rodando em http://localhost:5000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Você verá:
```
VITE v5.0.0  ready in ... ms

➜  Local:   http://localhost:3000
```

---

## 🎉 Pronto!

Abra seu navegador em: **http://localhost:3000**

### Teste assim:

1. Insira seu telefone com código do país: `+5511987654321`
2. Será enviado um código SMS
3. Digite o código
4. Vá para a tela de agendamento
5. (Se não houver dados, veja Passo 5 abaixo)

---

## 5️⃣ Adicione Dados de Teste (Opcional)

Se não há barbeiros/serviços, execute estes comandos (com o backend rodando):

### Criar Barbeiro
```bash
curl -X POST http://localhost:5000/api/barbers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@barbearia.com",
    "phone": "+55 11 98765-4321",
    "rating": 4.8,
    "initials": "JS"
  }'
```

### Criar Serviço
```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Corte de Cabelo",
    "description": "Corte tradicional",
    "duration": 30,
    "price": 50
  }'
```

**👉 Mais exemplos em: [docs/SEED_DATA.md](docs/SEED_DATA.md)**

---

## 📋 Checklist Final

- [ ] Firebase configurado
- [ ] Twilio configurado
- [ ] Google Calendar configurado
- [ ] `frontend/.env.local` preenchido
- [ ] `backend/.env` preenchido
- [ ] `backend/google-calendar-key.json` adicionado
- [ ] `npm install` executado em frontend
- [ ] `npm install` executado em backend
- [ ] Backend rodando em :5000
- [ ] Frontend rodando em :3000
- [ ] Acesso http://localhost:3000 funcionando
- [ ] Barbeiro criado
- [ ] Serviço criado
- [ ] Teste de login funcionando

---

## 🆘 Problemas Comuns

### "Erro: Não pode encontrar módulo X"
```bash
# Solução: reinstale as dependências
rm -rf node_modules package-lock.json
npm install
```

### "Porta 3000 já está em uso"
```bash
# Solução: mude a porta no vite.config.js
# Ou mate o processo: lsof -i :3000 | kill
```

### "Erro ao enviar WhatsApp"
- Verifique se o Twilio Sandbox está ativado
- Confirme seu número no sandbox
- Copie credenciais sem espaços extras

### "Firebase auth não funciona"
- Verifique se `.env.local` tem TODAS as variáveis
- Confira se ativou "Phone" no Firebase Auth

---

## 📚 Documentação

- **README.md** - Documentação completa
- **SETUP_RAPIDO.md** - Passo-a-passo detalhado
- **docs/API.md** - Endpoints da API
- **docs/SEED_DATA.md** - Scripts de dados
- **ENV_EXEMPLO.md** - Explicação de variáveis
- **CHECKLIST.md** - Lista de implementações
- **SUMARIO_PROJETO.md** - Resumo do projeto

---

## 🎁 Próximas Features

Depois de testar, considere adicionar:

- [ ] Dashboard do barbeiro
- [ ] Cancelamento de agendamentos
- [ ] Sistema de avaliações
- [ ] Pagamento online (Stripe)
- [ ] Admin panel
- [ ] Aplicativo mobile

---

## 🚀 Deploy em Produção

### Frontend (Vercel - GRATUITO)
```bash
npm install -g vercel
vercel
# Segue instruções na tela
```

### Backend (Render - GRATUITO)
1. Acesse https://render.com
2. Conecte seu repositório GitHub
3. Configure variáveis de ambiente
4. Deploy automático

---

## 📞 Suporte

Para dúvidas:
- Firebase: https://firebase.google.com/docs
- Twilio: https://twilio.com/docs
- Google Calendar: https://developers.google.com/calendar

---

## ✨ Bom uso!

Seu projeto de agendamento de barbearia está pronto para conquistar! 🪒

Desenvolvido com ❤️ para vender para barbearias.

**Sucesso! 🎉**
