# Sudbury Connect — Presentation Screenshots

Mobile screenshots (390×844, 2×) and desktop captures for slides, Devpost, and demo backup.

## Files

| File | Screen |
|------|--------|
| `01-language-mobile.png` | Language picker (EN / FR) |
| `02-categories-en-mobile.png` | What do you need? (English) |
| `03-about-you-en-mobile.png` | Who are you + where (English) |
| `04-results-en-mobile.png` | Results — mental health (English) |
| `04-results-food-en-desktop.png` | Results — food (desktop) |
| `05-results-fr-mobile.png` | Results — food, senior, downtown (French / Maria demo) |
| `01-language-desktop.png` | Language picker (desktop) |

## Regenerate

With the dev server running (`npm run dev`):

```bash
npm run screenshots
```

Or against production:

```bash
APP_URL=https://sudburyconnect.ca npm run screenshots
```

*(On Windows PowerShell: `$env:APP_URL="https://sudburyconnect.ca"; npm run screenshots`)*
