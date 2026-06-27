# Sudbury Connect — Hackathon TODO

> **Goal:** A friendly, accessible web app that asks 4-5 questions and returns 3-5 real, relevant Sudbury community resources. Wins on: real data, bilingual, voice, accessibility, and a story judges can feel.

---

## Team Roles

| Person | Role |
|---|---|
| **Person A** | Data + Backend (Apify scraping, resource database, Claude AI matching) |
| **Person B** | Frontend UI (Lovable — all screens, accessibility, French support) |
| **Person C** | Voice + Integration (Valsea voice I/O, connecting all pieces together) |

---

## PHASE 1 — Setup (Do this together first, ~1 hour)

- [ ] All 3 members clone the repo: `git clone https://github.com/mollyviau/sudbury-connect`
- [ ] All 3 run `npm install` and confirm the app runs locally with `npm run dev`
- [ ] Create a `.env` file from `.env.example` and fill in your API keys
- [ ] Confirm everyone can push a branch and open a pull request
- [ ] Agree on who is Person A, B, and C

---

## PHASE 2 — Person A: Data & AI Matching

### 2A — Scrape Real Sudbury Resources (Priority #1)
- [ ] Set up Apify account and create a new scraper
- [ ] Scrape **211ontario.ca** — search "Sudbury" for each category:
  - [ ] Food banks / meal programs
  - [ ] Mental health support
  - [ ] Housing assistance
  - [ ] Employment help
  - [ ] Legal aid
  - [ ] Senior services
  - [ ] Family & children services
- [ ] For each resource collect: name, category, who it serves, language, phone, hours, area of Sudbury
- [ ] Save results as `src/data/resources.json`
- [ ] Aim for at least 30-40 real resources

### 2B — Build Claude AI Matching Logic
- [ ] Create `src/lib/matchResources.ts`
- [ ] Write a function that takes user answers and sends them + resource list to Claude API
- [ ] Prompt Claude to return the 3-5 best matches in the user's chosen language
- [ ] Test matching with these 3 demo scenarios:
  - [ ] Scenario 1: Senior woman, French, needs food help, downtown Sudbury
  - [ ] Scenario 2: Young adult, English, mental health crisis, student
  - [ ] Scenario 3: Family with kids, English, housing issues, Val Caron
- [ ] Add `VITE_ANTHROPIC_API_KEY` to `.env.example`

---

## PHASE 3 — Person B: Frontend UI

### 3A — Screen 1: Language Selector
- [ ] Full screen, large buttons only
- [ ] Options: 🇬🇧 English | 🇫🇷 Français
- [ ] High contrast colours, minimum 18px font throughout app
- [ ] Store language choice in app state

### 3B — Screen 2: What Do You Need Help With?
- [ ] Large icon + label buttons (no small text)
- [ ] Categories: 🍎 Food | 🏠 Housing | 🧠 Mental Health | 💼 Employment | ⚖️ Legal | 👶 Family | 🧓 Seniors
- [ ] Allow selecting more than one category
- [ ] All labels translated to French

### 3C — Screen 3: A Bit About You
- [ ] Question 1: Who are you? (Student / Senior / Family / Individual) — big tap buttons
- [ ] Question 2: Where in Sudbury? (Downtown / South End / Hanmer / Capreol / Val Caron / Not sure)
- [ ] Keep it to 2 questions max — don't overwhelm

### 3D — Screen 4: Loading / Matching Screen
- [ ] Friendly message: "Finding resources for you..." / "Nous cherchons des ressources..."
- [ ] Simple animation so it feels like something is happening

### 3E — Screen 5: Results
- [ ] Show 3-5 resource cards
- [ ] Each card: Name, one-sentence description, phone number, hours
- [ ] Big "📞 Call" button on each card
- [ ] "🔄 Start Over" button at bottom
- [ ] Results displayed in chosen language

### 3F — Accessibility (non-negotiable)
- [ ] All text minimum 18px
- [ ] Colour contrast passes WCAG AA
- [ ] No jargon — plain language only
- [ ] Works on mobile (test on your phone)
- [ ] Tab navigation works for keyboard users

---

## PHASE 4 — Person C: Voice & Integration

### 4A — Voice Input (Valsea)
- [ ] Set up Valsea account and get API key
- [ ] Add a 🎤 microphone button to Screen 2 and 3
- [ ] User can speak their need instead of tapping (e.g. "I need food help")
- [ ] Convert speech to text and auto-select the matching category
- [ ] Add `VITE_VALSEA_API_KEY` to `.env.example`

### 4B — Voice Output
- [ ] On the results screen, add a 🔊 "Read to me" button
- [ ] When tapped, Valsea reads out each resource name, what they offer, and phone number
- [ ] Works in both English and French

### 4C — Connect Everything Together
- [ ] Wire Screen 3 → Claude matching function (from Person A)
- [ ] Wire Claude results → Results screen (from Person B)
- [ ] Make sure language choice flows through every screen
- [ ] Test the full flow end to end

---

## PHASE 5 — Polish & Demo Prep (last 2 hours)

- [ ] Load the 3 demo scenarios so judges can try them instantly
- [ ] Test entire app on a real phone
- [ ] Test French flow all the way through
- [ ] Test voice input and output
- [ ] Make sure all resource data is real and accurate
- [ ] Fix any crashes or broken flows
- [ ] Practice the demo out loud as a team

---

## Demo Script (for judges)

> "People in Sudbury who need help don't know where to turn — information is scattered across dozens of websites. Sudbury Connect fixes that."
>
> *[Hand judge the phone]*
>
> "Say you're Maria. She's 67, speaks French, and is worried about affording food this month. Watch what happens."
>
> *[Walk through the 4 screens — takes 30 seconds]*
>
> "She now has 3 real organizations she can call today. In her language. In under a minute."

---

## Definition of Done

- [ ] App loads on mobile
- [ ] French works end to end
- [ ] Voice input works on at least one screen
- [ ] Voice output reads results aloud
- [ ] Results are real Sudbury organizations with real phone numbers
- [ ] All 3 demo scenarios return good results
- [ ] No crashes during the demo

---

## API Keys Needed

Add these to your `.env` file (get from hackathon or sign up):

```
VITE_ANTHROPIC_API_KEY=
VITE_APIFY_API_KEY=
VITE_VALSEA_API_KEY=
```

---

*Last updated: project kickoff. Check off items as you go and communicate in your group chat when you finish a section so nobody duplicates work.*
