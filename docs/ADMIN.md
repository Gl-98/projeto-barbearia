# 🔐 Guia do Administrador - Barbearia Booking

## Acesso ao Admin

### URL
```
http://localhost:3000/admin
```

### Senha Padrão
```
admin@barbearia123
```

> ⚠️ **IMPORTANTE**: Em produção, mude essa senha no arquivo `.env` do backend!

---

## 🎯 Funcionalidades do Admin

### 1. Dashboard 📊
- Visão geral com estatísticas
- Total de barbeiros
- Total de serviços
- Total de agendamentos

### 2. Gerenciar Barbeiros 👨‍💼

#### Criar Novo Barbeiro
1. Clique em "➕ Novo Barbeiro"
2. Preencha:
   - **Nome**: Nome completo do barbeiro
   - **Email**: Email para notificações
   - **Telefone**: Telefone de contato
   - **Avaliação**: Nota de 0 a 5
   - **Iniciais**: Suas iniciais (ex: "JS" para João Silva)
3. Clique em "Salvar"

#### Editar Barbeiro
1. Na tabela, clique em "✏️ Editar"
2. Modifique os dados desejados
3. Clique em "Salvar"

#### Deletar Barbeiro
1. Na tabela, clique em "🗑️ Deletar"
2. Confirme a exclusão
3. Barbeiro será removido

### 3. Gerenciar Serviços ✂️

#### Criar Novo Serviço
1. Clique em "➕ Novo Serviço"
2. Preencha:
   - **Nome**: Nome do serviço (ex: "Corte de Cabelo")
   - **Descrição**: Breve descrição
   - **Duração**: Tempo em minutos
   - **Preço**: Valor em R$
3. Clique em "Salvar"

#### Editar Serviço
1. Na tabela, clique em "✏️ Editar"
2. Modifique os dados
3. Clique em "Salvar"

#### Deletar Serviço
1. Na tabela, clique em "🗑️ Deletar"
2. Confirme a exclusão

### 4. Visualizar Agendamentos 📅

Veja todos os agendamentos realizados com informações:
- Cliente
- Barbeiro
- Serviço
- Data e hora
- Status

---

## 🔐 Segurança

### Trocar Senha de Admin (Backend)

1. Abra o arquivo `backend/.env`
2. Procure por `ADMIN_SECRET_KEY`
3. Mude o valor:
   ```
   ADMIN_SECRET_KEY=sua_nova_senha_super_segura
   ```
4. Reinicie o servidor backend

### Boas Práticas

- ✅ Use uma senha forte
- ✅ Mude a senha padrão antes de ir para produção
- ✅ Não compartilhe a senha
- ✅ Use HTTPS em produção
- ✅ Faça logout ao sair

---

## 📊 Exemplo de Dados

### Barbeiro
```json
{
  "name": "João Silva",
  "email": "joao@barbearia.com",
  "phone": "+55 11 98765-4321",
  "rating": 4.8,
  "initials": "JS"
}
```

### Serviço
```json
{
  "name": "Corte de Cabelo",
  "description": "Corte tradicional moderno",
  "duration": 30,
  "price": 50
}
```

---

## 🧪 Teste de Funcionalidade

### 1. Criar Barbeiro de Teste
- Nome: "João Silva"
- Email: "joao@barbearia.com"
- Telefone: "+55 11 98765-4321"
- Avaliação: 4.8
- Iniciais: "JS"

### 2. Criar Serviço de Teste
- Nome: "Corte de Cabelo"
- Descrição: "Corte tradicional"
- Duração: 30 minutos
- Preço: R$ 50.00

### 3. Testar no App de Cliente
- Faça login com seu telefone
- Você deve ver o barbeiro e serviço criados
- Tente fazer um agendamento

---

## 🔄 Fluxo de Trabalho Típico

```
1. Gerenciar Barbeiros
   ├─ Criar novos barbeiros
   ├─ Editar informações (avaliação, contato)
   └─ Remover barbeiros inativos

2. Gerenciar Serviços
   ├─ Criar novos serviços
   ├─ Ajustar preços
   ├─ Alterar duração dos atendimentos
   └─ Remover serviços descontinuados

3. Monitorar Agendamentos
   ├─ Ver todos os agendamentos
   ├─ Acompanhar utilização
   └─ Identificar horários de pico
```

---

## 📱 Estrutura de Dados

### Barbeiros (Collection: `barbers`)
```
id: auto-gerado
├─ name: string
├─ email: string
├─ phone: string
├─ rating: number (0-5)
├─ initials: string
├─ createdAt: timestamp
└─ updatedAt: timestamp
```

### Serviços (Collection: `services`)
```
id: auto-gerado
├─ name: string
├─ description: string
├─ duration: number (minutos)
├─ price: number (reais)
├─ createdAt: timestamp
└─ updatedAt: timestamp
```

### Agendamentos (Collection: `bookings`)
```
id: uuid
├─ barberId: string
├─ userId: string
├─ serviceId: string
├─ date: timestamp
├─ time: string (HH:MM)
├─ endTime: timestamp
├─ status: string (confirmed/cancelled)
├─ userPhone: string
├─ barberName: string
├─ serviceName: string
├─ price: number
└─ createdAt: timestamp
```

---

## 🆘 Troubleshooting

### Erro: "Senha de admin incorreta"
**Solução:** Verifique se digitou a senha corretamente. Padrão é `admin@barbearia123`

### Barbeiro não aparece no app
**Solução:** 
1. Recarregue a página do cliente (F5)
2. Verifique se o barbeiro foi salvo com sucesso
3. Confirme a conexão com o backend

### Serviço deletado por engano
**Solução:** Infelizmente não há undo. Recrie o serviço com os mesmos dados.

### Alterações não aparecem em tempo real
**Solução:** Recarregue a página do cliente ou reinicie o app

---

## 📈 Próximas Features para Admin

- [ ] Relatório de agendamentos
- [ ] Gráficos de desempenho
- [ ] Gestão de horários (dias de folga)
- [ ] Histórico de preços
- [ ] Backup de dados
- [ ] Logs de atividades
- [ ] Sistema de avisos/alertas
- [ ] Integrações com CRM

---

## 📚 Referências

- [API Endpoints](./API.md)
- [Setup Rápido](./SETUP_RAPIDO.md)
- [README Principal](./README.md)

---

## 💬 Suporte

Para dúvidas sobre o admin:
1. Consulte esta documentação
2. Verifique os logs do backend
3. Teste com dados de exemplo
4. Reinicie aplicação

---

**Desenvolvido com ❤️ para gerenciar sua barbearia**

Versão 1.0.0 - 12 de fevereiro de 2026
