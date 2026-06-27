# Sudbury Connect — Hackathon Master Plan

> **What we're building:** A friendly, accessible web app where someone answers 4-5 simple questions and gets a personalized list of real Sudbury community resources — in their language, usable by anyone including seniors and children.
>
> **Hackathon Theme:** Health, Safety & Community Well-Being
>
> **We want to win.**

---

## Our App — 5 Screens

| Screen | What it does |
|---|---|
| **Screen 1** | Pick your language (English or French) |
| **Screen 2** | What do you need help with? (big icon buttons) |
| **Screen 3** | A bit about you (2 questions) |
| **Screen 4** | Loading — "Finding resources for you..." |
| **Screen 5** | Your results — 3-5 real local organizations |

---

## Our Tech Stack

| Tool | What it does | Who uses it |
|---|---|---|
| **Lovable** | Builds the UI visually, no coding needed | Person B |
| **Cursor** | Code editor for custom logic | Person A |
| **GitHub** | Central hub — all code lives here, everyone syncs through it | Everyone |
| **Apify** | Scrapes real Sudbury resource data from 211ontario.ca | Person A |
| **NVIDIA Nemotron** | AI that matches user answers to the right resources | Person A |
| **Valsea** | Voice input and output so users can speak instead of type | Person C |

---

## Team Roles

| Person | Role | Main tools |
|---|---|---|
| **Person A (programmer)** | Data + AI matching + wiring everything together | Cursor, Apify, Nemotron |
| **Person B** | All 5 screens in Lovable, accessibility, French labels | Lovable |
| **Person C** | Voice features, testing, demo prep | Valsea, phone |

---

## API Keys — What We Need and How to Get Them

> ⚠️ API keys are like passwords. Never share them, never post them in the group chat, never commit them to GitHub.



### Where to put your keys GET FROM MOLLY
Create a file called `.env` in the project root folder and paste your keys in:
```
VITE_NVIDIA_API_KEY=nvapi-xxxxxxxxxxxx
VITE_APIFY_API_KEY=xxxxxxxxxxxx
VITE_VALSEA_API_KEY=xxxxxxxxxxxx
```
Also create `.env.example` (this one IS committed to GitHub, with no real values):
```
VITE_NVIDIA_API_KEY=your_key_here
VITE_APIFY_API_KEY=your_key_here
VITE_VALSEA_API_KEY=your_key_here
```

---

## Git — How It Works (Read This First)

Git is the system that keeps everyone's work in sync. Think of it like Google Docs version history, but for code.

**GitHub** = the shared version of the project that lives online at github.com/mollyviau/sudbury-connect

**Your computer** = your local copy. You make changes here, then "push" them up to GitHub so everyone can see them.

**Branch** = your own personal workspace. You never work directly on `main` (the official version). You make a branch, do your work, then merge it back in.

---

## Git Setup — Do This Once on Your Computer

**Step 1 — Install Git**
- Mac: open Terminal and type `git --version` — if not installed, Mac will prompt you automatically
- Windows: download from git-scm.com/download/win, install with default settings, use Git Bash going forward

**Step 2 — Set your identity** (Terminal or Git Bash)
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```
Use the same email as your GitHub account.

**Step 3 — Clone the project** (only do this once)
```bash
git clone https://github.com/mollyviau/sudbury-connect
cd sudbury-connect
npm install
```

**Step 4 — Run the app locally**
```bash
npm run dev
```
Open the link it gives you in your browser. If you see the app, you're set up correctly.

---

## Git Workflow — Do This Every Single Time You Work

```
BEFORE you start:          WHILE you work:           WHEN you're done:
─────────────────          ───────────────           ─────────────────
git checkout main          (make your changes)       git add .
git pull origin main       (save your files)         git commit -m "what I did"
git checkout -b                                      git push origin your-branch-name
  feature/your-name                                  (open Pull Request on GitHub)
```

### Step by step with real commands:

**1. Always start by getting the latest code**
```bash
git checkout main
git pull origin main
```

**2. Make your own branch**
```bash
git checkout -b feature/your-name-task
```
Example branch names:
- `feature/molly-nemotron-matching`
- `feature/sarah-screen-2-ui`
- `feature/james-voice-input`

**3. Do your work and save it**
```bash
git add .
git commit -m "short description of what you did"
git push origin feature/your-name-task
```

**4. Open a Pull Request on GitHub**
- Go to github.com/mollyviau/sudbury-connect
- GitHub will show a yellow banner — click **"Compare & pull request"**
- Write a short note about what you did
- Click **"Create pull request"**
- Message the team so someone can review and merge it

**5. After it's merged, clean up and start fresh**
```bash
git checkout main
git pull origin main
```
Then repeat from Step 2 for your next task.

### Quick reference cheat sheet

| What you want to do | Command |
|---|---|
| Get latest code | `git checkout main` then `git pull origin main` |
| Start new work | `git checkout -b feature/your-name` |
| Save your work | `git add .` then `git commit -m "message"` |
| Upload your work | `git push origin feature/your-name` |
| Switch back to main | `git checkout main` |
| See what branch you're on | `git branch` |
| See what files you changed | `git status` |

### ⚠️ Important rules
- **Never** type `git push origin main` — always push to your own branch
- **Always** pull before starting work so you have the latest version
- **Lovable** pushes directly to main automatically — so always pull before opening Cursor
- If you see scary red text about "merge conflicts" — tell Person A immediately, don't try to fix it yourself

---

## PHASE 1 — Setup (All 3 people, do this together first)

- [x] Person A: accept all GitHub collaborator invites for teammates
- [x] All 3: install Git on your laptop (see Git Setup section above)
- [x] All 3: clone the repo and run `npm install`
- [x] All 3: run `npm run dev` and confirm the app opens in your browser
- [x] Person A: create `.env` and `.env.example` files
- [x] Person A: share API keys with teammates securely (NOT in group chat — use a private message)
- [x] All 3: create your `.env` file with the real keys

---

## PHASE 2 — Person A: Data & AI Matching

### 2A — Scrape Real Sudbury Resources ⭐ (Do this first — everything depends on it)

- [x] Sign up at apify.com and get your API key
- [ ] Go to **211ontario.ca** and search "Greater Sudbury"
- [ ] Scrape or manually collect resources from each category:
  - [ ] Food banks / meal programs
  - [ ] Mental health support
  - [ ] Housing assistance
  - [ ] Employment & job help
  - [ ] Legal aid
  - [ ] Senior services
  - [ ] Family & children services
- [ ] For every resource, collect:
  - Name of organization
  - Category (food, housing, mental health, etc.)
  - Who they serve (seniors / students / families / anyone)
  - Languages offered (English, French, or both)
  - Phone number
  - Hours of operation
  - Neighbourhood / area of Sudbury
  - One plain-English sentence: what do they actually do?
- [ ] Save everything as `src/data/resources.json`
- [ ] Goal: at least 30-40 real resources

### 2B — Set Up NVIDIA Nemotron (AI Matching)

- [x] Get NVIDIA API key from build.nvidia.com (see API Keys section)
- [x] Add `VITE_NVIDIA_API_KEY` to your `.env` file
- [x] Create `src/lib/matchResources.ts`
- [x] Paste in this starter code:

```javascript
export async function matchResources(userAnswers: {
  categories: string[];
  whoAreYou: string;
  area: string;
  language: string;
}) {
  // Load our resource list
  const resources = await import('../data/resources.json');

  const prompt = `
    You are a community resource assistant for Sudbury, Ontario.
    
    A person needs help. Here is what they told us:
    - They need help with: ${userAnswers.categories.join(', ')}
    - They are: ${userAnswers.whoAreYou}
    - They live in: ${userAnswers.area}
    - Their language: ${userAnswers.language}
    
    Here is our list of local resources:
    ${JSON.stringify(resources, null, 2)}
    
    Return ONLY a JSON array of the 3-5 most relevant resources for this person.
    Respond in ${userAnswers.language}.
    Format: [{ name, description, phone, hours, languages }]
  `;

  const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_NVIDIA_API_KEY}`
    },
    body: JSON.stringify({
      model: "nvidia/nemotron-3-super-120b-a12b",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000
    })
  });

  const data = await response.json();
  const text = data.choices[0].message.content;
  return JSON.parse(text);
}
```

- [ ] Test with these 3 demo scenarios — all must return good results:
  - [ ] **Scenario 1 (Maria):** Senior, French, needs food, downtown Sudbury
  - [ ] **Scenario 2 (Jake):** Student, English, mental health, no specific area
  - [ ] **Scenario 3 (The Tremblays):** Family with kids, English, housing crisis, Val Caron
- [ ] Make sure results come back in the correct language

### 2C — Wire the App Together

- [ ] Connect Screen 3 (user answers) → `matchResources()` function
- [ ] Connect `matchResources()` results → Screen 5 (results cards)
- [ ] Make sure the chosen language passes through every screen
- [ ] Make sure voice input from Person C's work flows into the same matching function
- [ ] Test the complete flow end to end with all 3 scenarios

---

## PHASE 3 — Person B: Frontend UI (Build entirely in Lovable)

> 💡 You don't need to write code. Build everything visually in Lovable. When you're done with a screen, Lovable will automatically commit it to GitHub. Person A will then connect the logic.

### 3A — Screen 1: Language Selector
- [ ] Full screen — nothing except two big buttons
- [ ] Button 1: 🇬🇧 **English**
- [ ] Button 2: 🇫🇷 **Français**
- [ ] Font minimum 18px everywhere in the app
- [ ] High contrast — dark text on light background (or vice versa)
- [ ] The chosen language must be remembered for every screen after this

### 3B — Screen 2: What Do You Need Help With?
- [ ] Big icon + text buttons — one per category, easy to tap
- [ ] Categories to include:
  - 🍎 Food / Nourriture
  - 🏠 Housing / Logement
  - 🧠 Mental Health / Santé mentale
  - 💼 Employment / Emploi
  - ⚖️ Legal Help / Aide juridique
  - 👶 Family & Children / Famille et enfants
  - 🧓 Senior Support / Soutien aux aînés
- [ ] User can tap more than one category
- [ ] Every label shown in both English and French (or switches based on Screen 1 choice)
- [ ] Leave a spot for a 🎤 microphone button (Person C will wire it up)
- [ ] A **"Next →"** button at the bottom to go to Screen 3

### 3C — Screen 3: A Bit About You
- [ ] Maximum 2 questions — do not add more, keep it simple
- [ ] **Question 1:** Who are you?
  - 🎓 Student / Étudiant(e)
  - 🧓 Senior / Aîné(e)
  - 👨‍👩‍👧 Family / Famille
  - 👤 Individual / Individu
- [ ] **Question 2:** Where in Sudbury?
  - Downtown / Centre-ville
  - South End / Extrémité sud
  - Hanmer
  - Capreol
  - Val Caron
  - Not sure / Je ne sais pas
- [ ] All options shown in the correct language
- [ ] Leave a spot for a 🎤 microphone button
- [ ] A **"Find Resources →"** button at the bottom

### 3D — Screen 4: Loading Screen
- [ ] Simple, friendly, centred on screen
- [ ] English: *"Finding resources for you..."*
- [ ] French: *"Nous cherchons des ressources pour vous..."*
- [ ] Add a simple spinner or dots animation — makes it feel alive
- [ ] This screen shows while Nemotron is thinking

### 3E — Screen 5: Results
- [ ] Show 3-5 cards, one per resource
- [ ] Each card must include:
  - Organization name (large, bold)
  - One sentence description (plain language)
  - 📞 Phone number — large text, tappable (opens phone dialer)
  - 🕐 Hours
  - 🗣️ Languages served
- [ ] **🔊 Read to me** button at the very top of the page
- [ ] **🔄 Start Over** button at the very bottom
- [ ] Everything in the correct language

### 3F — Accessibility (this is a huge part of why we win)
- [ ] Minimum 18px font on every single screen
- [ ] Buttons large enough for someone with shaky hands to tap
- [ ] No more than one task per screen
- [ ] Zero jargon — if a 10-year-old or a 75-year-old couldn't understand it, rewrite it
- [ ] Colour contrast high enough to read in sunlight
- [ ] Test by making your phone font size larger — does it still look ok?
- [ ] Test by handing it to someone who hasn't seen it — can they use it without help?

---

## PHASE 4 — Person C: Voice & Testing

### 4A — Set Up Valsea Voice Input
- [ ] Get Valsea API key (check hackathon materials)
- [ ] Add `VITE_VALSEA_API_KEY` to your `.env` file
- [ ] Tell Person A the key so they can add it to `.env.example`
- [ ] Wire up the 🎤 button on Screen 2 so:
  - User taps microphone
  - They say what they need (e.g. *"I need food and housing help"*)
  - App converts speech to text
  - Correct category buttons get selected automatically
- [ ] Wire up the 🎤 button on Screen 3 so:
  - User can say who they are and where they live
  - App selects the correct options
- [ ] Test voice input in English
- [ ] Test voice input in French

### 4B — Set Up Valsea Voice Output
- [ ] Wire up the 🔊 **Read to me** button on Screen 5
- [ ] When tapped, the app reads out loud:
  - Organization name
  - What they offer
  - Phone number
  - Hours
- [ ] Do this for all 3-5 result cards
- [ ] Test in English
- [ ] Test in French

### 4C — Be the Tester
- [ ] Run through the full app flow at least 5 times
- [ ] Test on your phone (not just a laptop)
- [ ] Test with a bigger font size on your phone
- [ ] Test all 3 demo scenarios (Maria, Jake, The Tremblays)
- [ ] Write down anything that's broken or confusing and tell Person A
- [ ] Test the French flow all the way through
- [ ] Confirm every phone number on the results screen is a real number

---

## PHASE 5 — Polish & Demo Prep (Last 2 hours — everyone)

- [ ] Pre-load all 3 demo scenarios so judges can tap and try immediately
- [ ] Do a full run-through on a phone in front of the whole team
- [ ] Fix any crashes, freezes, or broken screens
- [ ] Make sure all resource data is real — real org names, real phone numbers, real hours
- [ ] Practice the demo script out loud at least twice
- [ ] Decide who speaks during the demo

---

## Demo Script (practice this out loud)

> *"People in Sudbury who need help don't know where to turn. Information is scattered across dozens of websites in language most people can't navigate. Sudbury Connect fixes that in under a minute."*
>
> **[Hand the judge your phone]**
>
> *"Meet Maria. She's 67, speaks French, and is worried about how she's going to afford food this month. Watch."*
>
> **[Walk through the 4 screens — should take about 30 seconds]**
>
> *"Three real organizations she can call today. In her language. No Googling. No confusion. Just help."*
>
> *"It also works by voice — she doesn't even have to type."*
>
> **[Demo voice input]**

---

## The 3 Demo Scenarios — Have These Ready for Judges

| Scenario | Language | Need | Who | Area |
|---|---|---|---|---|
| **Maria** | French 🇫🇷 | Food | Senior | Downtown |
| **Jake** | English 🇬🇧 | Mental Health | Student | Any |
| **The Tremblays** | English 🇬🇧 | Housing | Family | Val Caron |

---

## Definition of Done ✅

Before the hackathon presentation, every single one of these must be true:

- [ ] App loads on a phone with no errors
- [ ] French works from Screen 1 all the way to Screen 5
- [ ] Voice input works on Screen 2
- [ ] Voice output reads results aloud on Screen 5
- [ ] All results are real Sudbury organizations with real phone numbers
- [ ] Maria scenario returns French food bank results
- [ ] Jake scenario returns English mental health resources
- [ ] Tremblays scenario returns English housing resources near Val Caron
- [ ] No crashes during the demo
- [ ] Full flow takes under 60 seconds

---

## What Wins Judges Over

1. **Real data** — actual Sudbury organizations, not fake placeholders
2. **Works on a phone** — they will pick it up and try it themselves
3. **French works** — bilingualism matters specifically in Sudbury
4. **Voice demo** — someone speaks into it and hears the answer read back
5. **The story** — judges feel the impact when you say "Maria is 67 and doesn't know where to turn"
6. **Accessibility** — designed for everyone, including seniors and children

---

*Everyone: check off tasks as you finish them and message the group chat so nobody doubles up on work.*
*Person A: you're the only programmer — if teammates are stuck on anything technical, they come to you first.*
