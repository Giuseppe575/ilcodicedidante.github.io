# PRD: Il Codice di Dante - Redesign

> **Versione**: 1.0
> **Stato**: Planning
> **Obiettivo**: Riprogettazione completa dell'interfaccia utente per creare una directory di progetti "Premium & Creative".

## 1. Visione del Prodotto
"Il Codice di Dante" deve evolversi da una semplice lista di link a una vetrina esperienziale. L'interfaccia deve comunicare dualità: **Creatività** (per progetti come *Roastami*) e **Professionalità** (per strumenti come *MOVARISCH*). Il design deve essere pulito, moderno e di forte impatto visivo.

## 2. Obiettivi di Design (Visual Guidelines)
Basato sui riferimenti visivi forniti:
- **Estetica**: Minimalista ma curata. Uso sapiente di spazi negativi (whitespace) per dare respiro ai contenuti.
- **Tipografia**: Font moderni, sans-serif, con pesi diversificati per creare gerarchia (es. Titoli Bold vs Testi descrittivi leggeri).
- **Color Palette**:
  - **Primary**: Un colore d'accento vibrante (es. Viola/Blu elettrico) per le Call to Action (CTA) e i badge.
  - **Background**: Tonalità chiare/scure pulite (Glassmorphism dove appropriato).
- **Componenti**:
  - **Card**: Bordi arrotondati, ombreggiature morbide (soft shadows), effetti hover "lift".
  - **Iconografia**: Icone pulite e moderne.

## 3. Funzionalità e Requisiti (Features)

### A. Hero Section (L'Impatto)
- **Titolo**: "Una directory di progetti creativi e professionali." (Grande, leggibile).
- **Sottotitolo**: Spiegazione chiara del valore ("Il Codice di Dante raccoglie applicazioni...").
- **Card "Perché questa vetrina"**: Un blocco visivo laterale o integrato che spiega la filosofia (Unione tra creatività e tecnologia, Nessuna vendita diretta, ecc.).
- **CTA Principale**: Bottone "Esplora Progetti".

### B. Sezione "App in Evidenza" (Featured)
- **Layout**: Griglia a due colonne per desktop (asimmetrica o bilanciata).
- **Card Progetto**:
  - **Immagine**: Mockup di alta qualità (es. iPhone per app mobile, Laptop/Ambiente per desktop app).
  - **Badge Categoria**: "Creativo" (es. Blue/Viola) VS "Professionale" (es. Grigio/Verde).
  - **Titolo & Descrizione**: Chiara e concisa.
  - **Link/Frecce**: Indicatore visivo di navigazione.

### C. Sezione "Chi Sono" (Personal Branding)
- **Container Distinto**: Uno sfondo diverso (es. scuro se il resto è chiaro, o viceversa) per staccare.
- **Foto Profilo**: Illustrazione o foto stilizzata.
- **Stats/Highlight**: Numeri chiave in evidenza (es. "10+ Progetti", "5k+ Utenti").
- **Copy**: Breve bio focalizzata su "Sviluppatore e Designer".

### D. Footer & Call to Action
- **Sezione "Hai un'idea folle?"**: Invito alla collaborazione.
- **Bottone**: "Invia una Mail" ben visibile.
- **Copyright**: Semplice e pulito.

## 4. Roadmap e Tasks

### Fase 1: Setup & Design System
- [ ] Definire le variabili CSS (Colori, Font, Spaziature).
- [ ] Configurare il layout base (Container, Grid system).

### Fase 2: Implementazione Core
- [ ] **Navbar**: Logo a sinistra, Link a destra, stile minimal.
- [ ] **Hero Section**: Creazione del layout testo + card descrittiva.
- [ ] **Feature Grid**: Implementazione delle card per Roastami e MOVARISCH con stili distinti.

### Fase 3: Personalizzazione e Dettagli
- [ ] **Chi Sono**: Implementazione del blocco scuro con stats e immagine.
- [ ] **Footer**: Sezione contatti e link finali.

### Fase 4: Polish
- [ ] **Animazioni**: Ingresso elementi (Fade-in), Hover effects sulle card.
- [ ] **Responsive**: Adattamento perfetto per Mobile e Tablet.