# Scripts de Inicialização do Firestore

Execute esses comandos com curl ou Postman para popular o banco com dados de teste.

## 1. Criar Barbeiros

```bash
# Barbeiro 1
curl -X POST http://localhost:5000/api/barbers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@barbearia.com",
    "phone": "+55 11 98765-4321",
    "rating": 4.8,
    "initials": "JS"
  }'

# Barbeiro 2
curl -X POST http://localhost:5000/api/barbers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Carlos Santos",
    "email": "carlos@barbearia.com",
    "phone": "+55 11 87654-3210",
    "rating": 4.9,
    "initials": "CS"
  }'

# Barbeiro 3
curl -X POST http://localhost:5000/api/barbers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pedro Oliveira",
    "email": "pedro@barbearia.com",
    "phone": "+55 11 96543-2109",
    "rating": 4.7,
    "initials": "PO"
  }'
```

## 2. Criar Serviços

```bash
# Corte de Cabelo
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Corte de Cabelo",
    "description": "Corte tradicional moderno",
    "duration": 30,
    "price": 50.00
  }'

# Barba
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Barba",
    "description": "Alinhamento e design de barba",
    "duration": 20,
    "price": 35.00
  }'

# Corte + Barba
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Corte + Barba",
    "description": "Corte completo com tratamento de barba",
    "duration": 50,
    "price": 80.00
  }'

# Pigmentação de Cabelo
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pigmentação",
    "description": "Coloração permanente",
    "duration": 60,
    "price": 120.00
  }'

# Alisamento
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alisamento",
    "description": "Alisamento químico profissional",
    "duration": 90,
    "price": 150.00
  }'
```

## 3. Listar Barbeiros (Verificar)

```bash
curl http://localhost:5000/api/barbers
```

## 4. Listar Serviços (Verificar)

```bash
curl http://localhost:5000/api/services
```

## 5. Verificar Disponibilidade

```bash
# Substituir BARBER_ID e DATE conforme necessário
curl http://localhost:5000/api/bookings/availability/barber-123/2024-02-20
```

---

## Usando Postman (Mais Fácil)

1. Abra o Postman
2. Crie uma nova requisição POST
3. URL: `http://localhost:5000/api/barbers`
4. Body (raw JSON):
```json
{
  "name": "João Silva",
  "email": "joao@barbearia.com",
  "phone": "+55 11 98765-4321",
  "rating": 4.8,
  "initials": "JS"
}
```
5. Clique em Send

---

## Dados de Teste Sugeridos

### Barbeiros
| Nome | Rating | Email |
|------|--------|-------|
| João Silva | 4.8 | joao@barbearia.com |
| Carlos Santos | 4.9 | carlos@barbearia.com |
| Pedro Oliveira | 4.7 | pedro@barbearia.com |

### Serviços
| Nome | Duração | Preço |
|------|---------|-------|
| Corte | 30 min | R$ 50 |
| Barba | 20 min | R$ 35 |
| Corte + Barba | 50 min | R$ 80 |
| Pigmentação | 60 min | R$ 120 |
| Alisamento | 90 min | R$ 150 |

---

Após adicionar os dados, teste fazendo um agendamento no app!
