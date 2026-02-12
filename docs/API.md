# Documentação da API - Barbearia Booking

## Base URL
```
http://localhost:5000/api
```

## Autenticação
A maioria dos endpoints requer autenticação via JWT. Adicione o header:
```
Authorization: Bearer <firebase_id_token>
```

---

## 🪒 Barbeiros

### Listar Todos os Barbeiros
```
GET /barbers
```

**Response (200):**
```json
[
  {
    "id": "barber-123",
    "name": "João Silva",
    "email": "joao@barbearia.com",
    "phone": "+55 11 98765-4321",
    "rating": 4.8,
    "initials": "JS",
    "createdAt": "2024-02-12T10:00:00Z"
  }
]
```

### Obter Barbeiro por ID
```
GET /barbers/:id
```

**Response (200):**
```json
{
  "id": "barber-123",
  "name": "João Silva",
  "email": "joao@barbearia.com",
  "phone": "+55 11 98765-4321",
  "rating": 4.8,
  "initials": "JS"
}
```

### Criar Novo Barbeiro
```
POST /barbers
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@barbearia.com",
  "phone": "+55 11 98765-4321",
  "rating": 5,
  "initials": "JS"
}
```

**Response (201):**
```json
{
  "id": "barber-new-id",
  "name": "João Silva",
  "email": "joao@barbearia.com"
}
```

---

## 💇 Serviços

### Listar Todos os Serviços
```
GET /services
```

**Response (200):**
```json
[
  {
    "id": "service-123",
    "name": "Corte de Cabelo",
    "description": "Corte tradicional",
    "duration": 30,
    "price": 50.00,
    "createdAt": "2024-02-12T10:00:00Z"
  }
]
```

### Obter Serviço por ID
```
GET /services/:id
```

### Criar Novo Serviço
```
POST /services
Content-Type: application/json

{
  "name": "Barba",
  "description": "Alinhamento de barba",
  "duration": 20,
  "price": 35.00
}
```

**Response (201):**
```json
{
  "id": "service-new-id",
  "name": "Barba",
  "description": "Alinhamento de barba",
  "duration": 20,
  "price": 35.00
}
```

---

## 📅 Agendamentos

### Criar Agendamento
```
POST /bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "barberId": "barber-123",
  "serviceId": "service-123",
  "date": "2024-02-20",
  "time": "14:30"
}
```

**Response (201):**
```json
{
  "id": "booking-123",
  "barberId": "barber-123",
  "userId": "user-123",
  "serviceId": "service-123",
  "date": "2024-02-20T14:30:00Z",
  "time": "14:30",
  "status": "confirmed",
  "barberName": "João Silva",
  "serviceName": "Corte de Cabelo",
  "price": 50.00,
  "userPhone": "+55 11 98765-4321"
}
```

### Obter Agendamento por ID
```
GET /bookings/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "booking-123",
  "barberId": "barber-123",
  "userId": "user-123",
  "serviceId": "service-123",
  "date": "2024-02-20T14:30:00Z",
  "time": "14:30",
  "status": "confirmed",
  "barberName": "João Silva",
  "serviceName": "Corte de Cabelo",
  "price": 50.00
}
```

### Listar Meus Agendamentos
```
GET /bookings/user/bookings
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": "booking-123",
    "date": "2024-02-20T14:30:00Z",
    "barberName": "João Silva",
    "serviceName": "Corte de Cabelo",
    "status": "confirmed"
  }
]
```

### Verificar Disponibilidade
```
GET /bookings/availability/:barberId/:date
```

**Parametros:**
- `barberId`: ID do barbeiro
- `date`: Data no formato YYYY-MM-DD

**Response (200):**
```json
[
  {
    "id": "2024-02-20-08:00",
    "time": "08:00"
  },
  {
    "id": "2024-02-20-08:30",
    "time": "08:30"
  }
]
```

---

## ❌ Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 400 | Erro na requisição (dados inválidos) |
| 401 | Não autorizado (token inválido/ausente) |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

---

## 📝 Exemplo de Fluxo Completo

### 1. Cliente faz login e recebe token Firebase

### 2. Listar barbeiros disponíveis
```bash
curl http://localhost:5000/api/barbers
```

### 3. Listar serviços disponíveis
```bash
curl http://localhost:5000/api/services
```

### 4. Verificar disponibilidade
```bash
curl http://localhost:5000/api/bookings/availability/barber-123/2024-02-20
```

### 5. Criar agendamento
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "barberId": "barber-123",
    "serviceId": "service-123",
    "date": "2024-02-20",
    "time": "14:30"
  }'
```

### 6. Cliente recebe:
- ✅ Confirmação na tela
- ✅ Mensagem WhatsApp
- ✅ Evento no Google Calendar do barbeiro

---

## 🔄 Status de Agendamento

- `confirmed`: Agendamento confirmado
- `cancelled`: Agendamento cancelado
- `completed`: Agendamento finalizado

---

## 📞 Support

Para dúvidas sobre a API, consulte o [README.md](../README.md) principal.
