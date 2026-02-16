# Guida Integrazione Stripe — ConsciusLabs

## Overview
Integrazione completa Stripe per pagamenti ricorrenti (subscription) e one-time.

---

## Step 1: Setup Account Stripe

1. Vai su https://stripe.com
2. Crea account business
3. Verifica email
4. Attiva modalità LIVE (dopo testing)

**Ottieni:**
- Publishable key (pk_live_...)
- Secret key (sk_live_...)
- Webhook signing secret (whsec_...)

---

## Step 2: Installazione Dipendenze

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js stripe
```

---

## Step 3: Variabili Ambiente

Crea `.env.local`:

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_API_URL=http://localhost:3000/api
```

---

## Step 4: Prodotti e Prezzi Stripe

Crea nel Dashboard Stripe:

### Prodotti

**1. Starter Mensile**
- Product: "ConsciusLabs Starter"
- Price: €297 / month
- Price ID: price_starter_monthly

**2. Starter Annuale**  
- Product: "ConsciusLabs Starter Annual"
- Price: €237 / month (billed annually)
- Price ID: price_starter_annual

**3. Professional Mensile**
- Product: "ConsciusLabs Professional" ⭐
- Price: €497 / month
- Price ID: price_pro_monthly

**4. Professional Annuale**
- Product: "ConsciusLabs Professional Annual"
- Price: €397 / month (billed annually)
- Price ID: price_pro_annual

**5. Business Mensile**
- Product: "ConsciusLabs Business"
- Price: €997 / month
- Price ID: price_business_monthly

**6. Business Annuale**
- Product: "ConsciusLabs Business Annual"
- Price: €797 / month (billed annually)
- Price ID: price_business_annual

### Coupon/Sconti

**Founders 50% OFF:**
- Coupon: FOUNDERS50
- 50% off first month
- Limited to first 10 customers

---

## Step 5: Architettura

```
Frontend (Vite/React)
  ↓
Stripe Elements (Card input)
  ↓
Backend API (Express/Node)
  ↓
Stripe API
  ↓
Webhook (payment confirmation)
  ↓
Database (customer/subscription status)
```

---

## Step 6: Flusso Pagamento

### 6.1 Subscription Flow

1. **Customer** seleziona piano su `/preventivo`
2. **Frontend** chiama `/api/create-subscription`
3. **Backend** crea customer + subscription in Stripe
4. **Stripe** restituisce `clientSecret`
5. **Frontend** monta Stripe Elements con `clientSecret`
6. **Customer** inserisce dati carta
7. **Stripe Elements** conferma pagamento
8. **Stripe** invia webhook `invoice.paid`
9. **Backend** attiva account customer
10. **Customer** redirect a `/success`

### 6.2 One-time Payment (Setup Fee)

Stesso flow ma con `payment_intent` invece di `subscription`.

---

## Step 7: Webhook Events da Gestire

```javascript
// Eventi critici
- customer.subscription.created
- customer.subscription.updated
- customer.subscription.deleted
- invoice.paid
- invoice.payment_failed
- payment_intent.succeeded
- payment_intent.payment_failed
```

---

## Step 8: Testing

### Test Cards Stripe

| Card Number | Scenario |
|-------------|----------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 0002 | Declined |
| 4000 0000 0000 9995 | Insufficient funds |

### Test Flow
1. Usa modalità TEST in Stripe
2. Procedi con pagamento
3. Verifica webhook ricevuti
4. Controlla customer in Dashboard

---

## Step 9: Go Live Checklist

- [ ] Stripe account verificato
- [ ] Webhook endpoint configurato (HTTPS)
- [ ] Test completati in modalità TEST
- [ ] Switch a chiavi LIVE
- [ ] Privacy Policy e Terms sul sito
- [ ] Refund policy chiara
- [ ] Customer support email attiva

---

## Note Sicurezza

**MAI includere Secret Key nel frontend!**
- Publishable Key → Frontend ✓
- Secret Key → Backend only ✓
- Webhook Secret → Backend only ✓

**PCI Compliance:**
- Stripe Elements è PCI compliant
- Non salvare dati carta sul tuo server
- Usa sempre HTTPS in produzione

---

## Costi Stripe

| Tipo | Costo |
|------|-------|
| European cards | 1.5% + €0.25 |
| UK cards | 1.5% + €0.25 |
| International | 3.25% + €0.25 |
| Subscriptions | Same as above |
| Webhook | Free |

**Esempio Professional €497:**
- Fee Stripe: €497 × 1.5% + €0.25 = €7.46 + €0.25 = €7.71
- Netto: €497 - €7.71 = €489.29

---

## Next Steps

1. Crea account Stripe
2. Configura prodotti e prezzi
3. Implementa componenti (vedi files)
4. Test in modalità TEST
5. Go live

**Prossimo:** Vuoi che crei i file di implementazione (frontend + backend)?
