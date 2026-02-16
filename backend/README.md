# Backend API — ConsciusLabs Stripe Integration

Server Node.js/Express per gestire pagamenti Stripe e webhook.

## 📁 Struttura Backend

```
backend/
├── src/
│   ├── config/
│   │   ├── stripe.js         # Configurazione Stripe
│   │   └── supabase.js       # Configurazione Supabase
│   ├── routes/
│   │   ├── subscriptions.js  # API subscription
│   │   └── webhooks.js       # Webhook Stripe
│   ├── controllers/
│   │   └── subscriptionController.js
│   └── index.js              # Entry point
├── .env                      # Variabili ambiente
├── package.json
└── vercel.json               # Deploy su Vercel
```

## 🚀 Installazione

```bash
cd backend
npm init -y
npm install express cors dotenv stripe @supabase/supabase-js
npm install --save-dev nodemon
```

## 📋 API Endpoints

### POST /api/create-subscription
Crea un nuovo abbonamento.

**Request:**
```json
{
  "priceId": "price_xxx",
  "email": "cliente@email.com",
  "name": "Mario Rossi",
  "couponCode": "FOUNDERS50"
}
```

**Response:**
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "subscriptionId": "sub_xxx",
  "customerId": "cus_xxx"
}
```

### POST /api/webhook
Riceve eventi da Stripe.

## 🔐 Sicurezza

- CORS configurato per dominio frontend
- Webhook verificato con signing secret
- Secret key mai esposta

## 🚀 Deploy

Vercel Serverless Functions (consigliato)
oppure Railway/Render per server tradizionale
