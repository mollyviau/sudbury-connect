import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'presentation', 'screenshots');
const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

async function ensureDir() {
  await mkdir(OUT_DIR, { recursive: true });
}

async function screenshot(page, filename) {
  const filePath = path.join(OUT_DIR, filename);
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(`Saved ${filePath}`);
}

async function waitForApp(page) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Choose your language', { timeout: 15_000 });
}

async function captureMobile() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();

  await waitForApp(page);
  await screenshot(page, '01-language-mobile.png');

  await page.getByRole('button', { name: /English/i }).click();
  await page.waitForSelector('text=What do you need help with?');
  await screenshot(page, '02-categories-en-mobile.png');

  await page.getByRole('button', { name: /Mental Health/i }).click();
  await page.getByRole('button', { name: /Next/i }).click();
  await page.waitForSelector('text=Who are you?');
  await screenshot(page, '03-about-you-en-mobile.png');

  await page.getByRole('button', { name: /Find Resources/i }).click();
  await page.waitForSelector('text=Here\'s your shortlist', { timeout: 15_000 });
  await screenshot(page, '04-results-en-mobile.png');

  await page.getByRole('button', { name: /Home/i }).click();
  await page.waitForSelector('text=Choose your language');

  await page.getByRole('button', { name: /Français/i }).click();
  await page.waitForSelector('text=De quoi avez-vous besoin?');
  await page.getByRole('button', { name: /Nourriture/i }).click();
  await page.getByRole('button', { name: /Suivant/i }).click();
  await page.waitForSelector('text=Qui êtes-vous?');
  await page.getByRole('button', { name: /Aîné/i }).click();
  await page.getByRole('button', { name: /Centre-ville/i }).click();
  await page.getByRole('button', { name: /Trouver des ressources/i }).click();
  await page.waitForSelector('text=Votre liste', { timeout: 15_000 });
  await screenshot(page, '05-results-fr-mobile.png');

  await browser.close();
}

async function captureDesktop() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  await waitForApp(page);
  await screenshot(page, '01-language-desktop.png');

  await page.getByRole('button', { name: /English/i }).click();
  await page.getByRole('button', { name: /Food/i }).click();
  await page.getByRole('button', { name: /Next/i }).click();
  await page.getByRole('button', { name: /Find Resources/i }).click();
  await page.waitForSelector('text=Here\'s your shortlist', { timeout: 15_000 });
  await screenshot(page, '04-results-food-en-desktop.png');

  await browser.close();
}

await ensureDir();
await captureMobile();
await captureDesktop();
console.log(`\nDone — screenshots in ${OUT_DIR}`);
