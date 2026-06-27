# Sudbury Connect

**Sudbury Connect** is a bilingual, fully accessible directory that instantly connects seniors, students, and kids to local food, mental health, or legal aid in just a few simple clicks.

🌐 **Live demo:** [https://sudbury-connect.vercel.app](https://sudbury-connect.vercel.app) 

📦 **Hackathon theme:** Health, Safety & Community Well-Being

---

## About the Project

Finding help in Greater Sudbury shouldn’t require knowing the right agency name, navigating English-only websites, or filling out long forms. **Sudbury Connect** guides people through a short, tap-friendly flow — in **English or French** — and returns real local organizations with phone numbers, hours, and descriptions they can read or hear aloud.

Built for **seniors, students, families, and children**, the app works on a phone with large buttons, voice input, text-to-speech results, and crisis numbers always visible at the bottom of the screen.

### How it works

| Step | What you do |
|------|-------------|
| 1 | Choose your language |
| 2 | Pick what you need (food, housing, mental health, and more) |
| 3 | Tell us a bit about you and where you are *(defaults: Individual · Not sure)* |
| 4 | Get matched resources instantly |
| 5 | Call, read aloud, or browse more results |

---

## Project Story

### What inspired us

Sudbury is bilingual and diverse — but community resources are scattered across dozens of sites, often buried in PDFs or English-only pages. We kept thinking about **Maria**, a French-speaking senior who needs food downtown, and **Jake**, a student in crisis who doesn’t know where to turn. Existing directories assume you already know what to search for. We wanted something that feels like a **kind neighbour pointing you in the right direction**, not a government form.

### What we learned

- **Accessibility is the product** — big targets, no scrolling, defaults for “I don’t know,” and voice matter as much as the data.
- **Bilingual isn’t a toggle** — French descriptions, crisis lines, and UI copy all need to work end-to-end, not just the labels.
- **Speed beats clever AI in the hot path** — local matching gives instant results; AI (Nemotron) is great for integration tests and voice parsing fallbacks.
- **Real data is hard** — scraping and normalizing 211 / municipal listings taught us how messy community resource data actually is.

### How we built it

1. **Data** — Community listings collected and structured with **Apify** (211 Ontario / Greater Sudbury sources); stored in `src/data/resources.json`.
2. **UI** — Five-screen flow designed for mobile, built with **React + Vite + TypeScript** in **Cursor**, with **Lovable** for visual UI polish.
3. **Matching** — Fast local scoring by category, who you are, area, and language; **NVIDIA Nemotron** for AI-assisted matching tests and voice intent parsing.
4. **Voice** — Browser speech recognition and read-aloud for speed; **Valsea AI** as fallback when the browser doesn’t support mic input.
5. **Deploy** — Static build on **Vercel**, synced from **GitHub**.

### Challenges we faced

- **CORS in the browser** — Direct API calls to NVIDIA/Valsea failed in dev; we added Vite proxies and moved the main user flow to local matching.
- **Voice accuracy** — Canadian English/French needed browser STT (`en-CA` / `fr-CA`) plus keyword-first parsing before AI fallback.
- **Above-the-fold layout** — Every screen had to fit on one phone viewport with the emergency footer visible; we compacted grids and paginated results.
- **Messy source data** — Scraped fields didn’t always align; we normalized hours, languages, and categories in the loader.

---

## Demo Scenarios

Try these flows on the live app:

| Persona | Language | Need | Who | Area |
|---------|----------|------|-----|------|
| **Maria** | French | Food | Senior | Downtown |
| **Jake** | English | Mental health | Student | Any |
| **The Tremblays** | English | Housing | Family | Val Caron |

---

## Built With

### Hackathon & sponsor stack

| Tool | How we use it |
|------|----------------|
| [**Cursor**](https://cursor.com) | AI-assisted development — app logic, matching, voice, and wiring |
| [**Lovable**](https://lovable.dev) | Visual UI design and frontend polish |
| [**Apify**](https://apify.com) | Scraping and structuring Sudbury community resource data |
| [**NVIDIA Nemotron**](https://build.nvidia.com) | AI resource matching (integration tests) and voice intent parsing |
| [**Valsea AI**](https://valsea.ai) | Voice transcription fallback when browser STT is unavailable |
| [**GitHub**](https://github.com/mollyviau/sudbury-connect) | Source control and team collaboration |
| [**Vercel**](https://vercel.com) | Production hosting |

### Core tech

- **React 19** + **TypeScript**
- **Vite**
- **Web Speech API** (speech recognition + text-to-speech)
- **Oxlint**

---

## Features

- Bilingual **English / French** from first screen to results
- Large, tappable category buttons — no typing required
- **Voice input** — say what you need; optional **Read to me** on results
- Smart defaults: **Individual** + **Not sure** for location
- **Emergency footer** — 911, Sudbury crisis line, 988, 811, 211, Kids Help Phone
- Compact, **above-the-fold** layout for phones
- Instant local matching — no waiting on AI for the button flow

---

## Getting Started (developers)

### Prerequisites

- Node.js 18+
- npm

### Install & run

```bash
git clone https://github.com/mollyviau/sudbury-connect.git
cd sudbury-connect
npm install
cp .env.example .env.local   # add your API keys
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Environment variables

Copy `.env.example` to **`.env.local`** (never commit this file):

```
VITE_NVIDIA_API_KEY=...
VITE_APIFY_API_KEY=...
VITE_VALSEA_API_KEY=...
```

The demo flow works without keys (local matching + browser voice). Keys are needed for Nemotron tests and Valsea fallback.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test:resources` | Test local resource matching |
| `npm run test:nemotron` | Test NVIDIA Nemotron integration |

---

## Project Structure

```
src/
├── App.tsx              # 5-screen user flow
├── components/          # Header, voice button, emergency footer
├── data/resources.json  # Community resource listings
├── i18n.ts              # English / French strings
└── lib/
    ├── matchResources.ts   # Local + AI matching
    ├── parseVoiceInput.ts  # Voice → structured answers
    ├── browserSpeech.ts    # Browser STT
    ├── readAloud.ts        # Browser TTS
    ├── nvidiaChat.ts       # Nemotron API
    └── valsea.ts           # Valsea voice fallback
```

---

## Team

Built at The Sudbury Cursorhackathon by a team passionate about **health, safety, and community well-being**.

Molly Viau - Lead Developer  
Audrey Goudi B - Data analysis  
Alex Yator

---

## License

Hackathon project — see repository for details.

---

## Links

- **Live app:** [https://sudbury-connect.vercel.app](https://sudbury-connect.vercel.app)
- **GitHub:** [https://github.com/mollyviau/sudbury-connect](https://github.com/mollyviau/sudbury-connect)
- **Devpost:** *(add your submission URL when ready)*
