# INTEGRAZIONE COMPLETATA ✅

## Backend Node.js/Express + Supabase Creato

### 📁 Struttura Backend

```
backend/
├── src/
│   ├── config/
│   │   ├── stripe.js         ✅ Configurazione Stripe
│   │   └── supabase.js       ✅ Configurazione Supabase
│   ├── controllers/
│   │   └── subscriptionController.js  ✅ Logica API
│   ├── routes/
│   │   ├── subscriptions.js  ✅ Route /api/create-subscription
│   │   └── webhooks.js       ✅ Route /api/webhook
│   └── index.js              ✅ Server Express
├── .env.example              ✅ Template variabili
├── supabase-schema.sql       ✅ Schema database
├── SUPABASE_SETUP.md         ✅ Guida setup Supabase
└── vercel.json               ✅ Config deploy Vercel
```

---

## 🚀 API Endpoints

### 1. POST /api/create-subscription
Crea un nuovo abbonamento Stripe + salva su Supabase.

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
  "customerId": "cus_xxx",
  "status": "incomplete"
}
```

### 2. POST /api/webhook
Riceve eventi da Stripe (pagamenti, cancellazioni, etc.).

**Eventi gestiti:**
- `invoice.paid` → Attiva account
- `invoice.payment_failed` → Notifica cliente
- `customer.subscription.updated` → Aggiorna stato
- `customer.subscription.deleted` → Disattiva account

---

## 📋 STEP PER ATTIVARE

### 1. Configura Supabase (5 min)

1. Vai su https://supabase.com
2. Crea progetto gratuito
3. Vai su **SQL Editor** → **New Query**
4. Copia/incolla `backend/supabase-schema.sql`
5. Clicca **Run**

**Ottieni credenziali:**
- Project Settings → API → `SUPABASE_URL`
- Project Settings → API → Service Role Key → `SUPABASE_SERVICE_KEY`

### 2. Configura Stripe (5 min)

1. Vai su https://dashboard.stripe.com
2. Crea prodotti e prezzi:
   - Starter Monthly €297
   - Starter Annual €237
   - Professional Monthly €497
   - Professional Annual €397
   - Business Monthly €997
   - Business Annual €797
3. Crea coupon `FOUNDERS50` (50% off)
4. Ottieni API keys

### 3. Deploy Backend (5 min)

**Opzione A: Vercel (Consigliato)**
```bash
cd backend
npm install
vercel --prod
```

**Opzione B: Railway**
1. Connetti repo GitHub
2. Setta variabili ambiente
3. Deploy automatico

### 4. Configura Variabili Ambiente

**File `.env` (locale):**
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://...
SUPABASE_SERVICE_KEY=eyJ...
```

**Vercel Dashboard (produzione):**
Aggiungi le stesse variabili in Settings → Environment Variables

### 5. Connetti Frontend

**File `src/lib/stripe.ts`:**
Aggiorna gli `PRICE_IDS` con quelli reali da Stripe Dashboard.

**URL Backend:**
In `src/components/CheckoutForm.tsx`, cambia:
```javascript
// Da:
const response = await fetch('/api/create-subscription', ...)

// A:
const response = await fetch('https://tuo-backend.vercel.app/api/create-subscription', ...)
```

---

## 🧪 TESTING

### 1. Test Locale
```bash
cd backend
npm run dev

# In un altro terminale
curl -X POST http://localhost:3001/api/create-subscription \
  -H "Content-Type: application/json" \
  -d '{"priceId":"price_test","email":"test@test.com"}'
```

### 2. Test con Stripe CLI
```bash
stripe login
stripe listen --forward-to localhost:3001/api/webhook
```

### 3. Test Card
- **Successo:** 4242 4242 4242 4242
- **Fallimento:** 4000 0000 0000 0002

---

## 💰 FLUSSO PAGAMENTO

```
1. Cliente clicca "Abbonati" sul sito
        ↓
2. Frontend chiama /api/create-subscription
        ↓
3. Backend crea customer + subscription Stripe
        ↓
4. Backend salva record in Supabase (status: incomplete)
        ↓
5. Backend ritorna clientSecret al frontend
        ↓
6. Frontend mostra Stripe Elements (form carta)
        ↓
7. Cliente inserisce dati carta
        ↓
8. Stripe conferma pagamento
        ↓
9. Stripe invia webhook invoice.paid
        ↓
10. Backend aggiorna Supabase (status: active)
        ↓
11. Cliente redirect a /success
        ↓
12. Account attivo! 🎉
```

---

## 🔐 SICUREZZA

✅ CORS configurato per frontend  
✅ Webhook verificato con signature  
✅ Secret key solo backend  
✅ RLS attivo su Supabase  
✅ Service role key protetta  

---

## 🚀 PROSSIMI STEP

1. **Deploy backend** su Vercel/Railway
2. **Configura Supabase** (run SQL schema)
3. **Crea prodotti** in Stripe Dashboard
4. **Aggiorna PRICE_IDS** nel frontend
5. **Testa pagamento** con card 4242...
6. **Go live!** 🎉

---

**Hai bisogno di aiuto per uno di questi step?**
