# Setup Supabase per ConsciusLabs

## Step 1: Crea Progetto Supabase

1. Vai su https://supabase.com
2. Clicca "New Project"
3. Nome: `consciuslabs`
4. Password database: scegli una password sicura (salvala!)
5. Region: Europa (Frankfurt)
6. Piano: Free Tier ( sufficiente per iniziare)

## Step 2: Ottieni Credenziali

Dopo la creazione, vai su **Project Settings** → **API**:

**URL:**
```
https://your-project-id.supabase.co
```

**Service Role Key:** (NOTA: Questa è diversa dalla anon key!)
- Vai su **Project Settings** → **API** → **Service Role Secrets**
- Copia la **service_role key** (inizia con `eyJ...`)

## Step 3: Crea Tabella

1. Vai su **SQL Editor** (sidebar)
2. Clicca **New Query**
3. Copia e incolla il contenuto di `supabase-schema.sql`
4. Clicca **Run**

## Step 4: Verifica

Dovresti vedere:
- Tabella `subscriptions` creata
- Indici creati
- Trigger per `updated_at`
- RLS policies attive

## Step 5: Inserisci in .env

```bash
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=eyJ...
```

## Troubleshooting

**Errore: "permission denied for table subscriptions"**
→ Verifica di usare la **Service Role Key** (non l'anon key!)

**Errore: "relation subscriptions does not exist"**
→ Lo schema SQL non è stato eseguito. Riprova Step 3.

## Monitoring

Supabase Dashboard → **Table Editor** → **subscriptions**

Qui puoi vedere tutti i record in tempo reale.
