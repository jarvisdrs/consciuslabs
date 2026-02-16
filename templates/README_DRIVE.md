# Struttura Google Drive ConsciusLabs

> Come organizzare le cartelle per cliente e progetto

---

## 📁 STRUTTURA MASTER (tua cartella principale)

```
📦 ConsciusLabs (Google Drive Root)
│
├── 📁 01_Amministrazione/
│   ├── 📄 Contratti/
│   │   ├── Template_Contratto.docx
│   │   ├── [Cliente1]_Contratto_2026.pdf
│   │   └── [Cliente2]_Contratto_2026.pdf
│   │
│   ├── 📄 Fatture/
│   │   ├── 2026/
│   │   │   ├── 01_Gennaio/
│   │   │   ├── 02_Febbraio/
│   │   │   └── ...
│   │   └── Template_Fattura.xlsx
│   │
│   ├── 📄 Spese/
│   │   └── 2026/
│   │
│   └── 📄 Dati_Fiscali/
│       └── (copia P.IVA, etc.)
│
├── 📁 02_Clienti/
│   ├── 📁 ATTIVI/           ← Clienti paganti attuali
│   │   ├── 📁 [Nome_Cliente_1]/
│   │   ├── 📁 [Nome_Cliente_2]/
│   │   └── ...
│   │
│   ├── 📁 PROSPECT/         ← Potenziali clienti contattati
│   │   └── [Nome_Prospect]/
│   │
│   └── 📁 COMPLETATI/       ← Clienti che hanno finito collaborazione
│       └── [Nome_Cliente]/
│
├── 📁 03_Progetti/
│   ├── 📁 [Cliente1]_Progetto1_2026-02/
│   ├── 📁 [Cliente1]_Progetto2_2026-03/
│   └── ...
│
├── 📁 04_Templates/
│   ├── 📄 Email/
│   │   ├── Cold_Outreach.txt
│   │   ├── Follow_Up.txt
│   │   ├── Consegna.txt
│   │   └── ...
│   │
│   ├── 📄 Documenti/
│   │   ├── README_Consegna.docx
│   │   ├── Proposta_Commerciale.docx
│   │   └── Report_Mensile.xlsx
│   │
│   └── 📄 Grafiche/
│       ├── Canva_Templates/
│       └── Quote_Cards_Templates/
│
├── 📁 05_Archivio/
│   ├── 📁 2026/
│   └── 📁 2025/
│
└── 📁 06_Risorse/
    ├── 📁 Formazione/
    ├── 📁 Tools/
    └── 📁 Ricerche/
```

---

## 📁 STRUTTURA CARTELLA CLIENTE (esempio)

```
📦 02_Clienti/ATTIVI/Rossi_Mario/
│
├── 📄 INFO_CLIENTE.txt        ← Note, preferenze, brand voice
├── 📄 CONTRATTO.pdf
├── 📄 FATTURAZIONE.xlsx       ← Storico pagamenti
│
└── 📁 Progetti/
    ├── 📁 2026-02_Podcast_Marketing/
    │   ├── 📄 README.pdf
    │   ├── 📄 REPORT.xlsx
    │   ├── 🎬 Video/
    │   │   ├── 01_linkedin_hook.mp4
    │   │   ├── 02_instagram_story.mp4
    │   │   └── ...
    │   ├── 📝 Testi/
    │   │   ├── linkedin_post_01.txt
    │   │   ├── thread_x.txt
    │   │   └── ...
    │   └── 🖼️ Grafiche/
    │       └── carosello_01/
    │           ├── slide_01.png
    │           ├── slide_02.png
    │           └── ...
    │
    └── 📁 2026-03_Webinar_Vendite/
        └── ...
```

---

## 📝 FILE INFO_CLIENTE.txt (template)

```markdown
# INFO CLIENTE: [Nome Cliente]

## Dati Anagrafici
- Nome: [Nome completo]
- Email: [email@cliente.com]
- Telefono: [+39...]
- Azienda: [Nome azienda]
- P.IVA: [se disponibile]

## Piano Attivo
- Piano: [Early Adopter / Standard / Pro]
- Inizio: [data]
- Pagamento: [mensile/annuale]
- Importo: [€...]

## Preferenze
- Tonality: [professionale / friendly / aspirazionale]
- Colori brand: [#XXXXXX, #XXXXXX]
- Font: [se specificato]
- Hashtag personali: [#..., #...]

## Piattaforme Target
- [ ] LinkedIn
- [ ] Instagram
- [ ] X/Twitter
- [ ] YouTube
- [ ] Newsletter

## Note Speciali
- [Qualsiasi cosa importante da ricordare]
- [Allergie, preferenze, etc.]

## Storico Interazioni
- [2026-02-15] Prima call, accordo test gratuito
- [2026-02-16] Consegna test, cliente soddisfatto
- [2026-02-17] Attivazione piano Standard
```

---

## 🔗 LINK CARTELLE CONDIVISE (template per email)

```
Puoi caricare i tuoi contenuti qui:
👉 https://drive.google.com/drive/folders/[ID_CARTELLA]

La cartella è organizzata così:
📁 01_Contenuti_Da_Repurpare/  ← Carica qui i tuoi video/audio
📁 02_Consegne/                ← Troverai qui i contenuti pronti
📄 INFO.txt                    ← Aggiorna con brief mensile

Permessi: solo tu e io abbiamo accesso.
```

---

## ⚙️ PERMESSI E CONDIVISIONI

**Cartella Admin (tua):**
- Proprietario: tu (consciuslabs@gmail.com)
- Accesso: privato, solo tu

**Cartella Cliente:**
- Proprietario: tu
- Condivisa con: cliente (solo view)
- Link: "Anyone with link can view" (per consegne)

**Cartella Contenuti da Repurpare:**
- Proprietario: tu
- Condivisa con: cliente (editor, può caricare)
- Link: specifico per cliente

---

## 🎯 NOMENCLATURA FILE

**Progetti:**
```
[ANNO]-[MESE]_[TipoContenuto]_[TitoloBreve]

Esempi:
2026-02_Podcast_MarketingDigitale
2026-02_Webinar_VenditeB2B
2026-03_YouTube_GrowthHacking
```

**File consegna:**
```
[ordine]_[piattaforma]_[descrizione].[estensione]

Esempi:
01_linkedin_post_hook.txt
02_instagram_reel_clip01.mp4
03_carosello_5_slide.zip
```

**Fatture:**
```
Fattura_[NUMERO]_[Cliente]_[Data].pdf

Esempio:
Fattura_001_RossiMario_2026-02-17.pdf
```

---

## 📊 BACKUP

**Frequenza:** Mensile

**Cosa backuppare:**
- [ ] Tutte le cartelle clienti
- [ ] Fatture e contratti
- [ ] Templates aggiornati

**Dove:**
- Hard disk esterno
- Oppure secondo account Google Drive

---

## ✅ CHECKLIST SETUP NUOVO CLIENTE

- [ ] Creare cartella cliente in `02_Clienti/ATTIVI/`
- [ ] Creare sottocartelle (Progetti, Contratti, etc.)
- [ ] Creare file `INFO_CLIENTE.txt` e compilare
- [ ] Creare cartella `01_Contenuti_Da_Repurpare/` (condivisa editor)
- [ ] Creare cartella `02_Consegne/` (condivisa viewer)
- [ ] Inviare link al cliente via email
- [ ] Verificare che il cliente riesca ad accedere
- [ ] Aggiungere scadenza reminder su Calendar

---

## 🚀 PROSSIMI PASSI

1. **Crea la struttura master** (20 min)
2. **Crea i template** nella cartella 04_Templates
3. **Testa con 1 cliente beta** e affina
4. **Documenta** cosa funziona e cosa no

---

*Struttura aggiornata: 2026-02-16*
