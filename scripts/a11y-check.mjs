/**
 * Basic accessibility scan with axe-core.
 * Run with dev server: npm run dev (then npm run test:a11y)
 * Or: APP_URL=https://sudburyconnect.ca npm run test:a11y
 */
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';
const ROUTES = ['/', '/resources', '/about'];

let failed = false;

for (const route of ROUTES) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle', timeout: 60_000 });
    const results = await new AxeBuilder({ page })
      .exclude('iframe')
      .analyze();
    const violations = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');

    console.log(`\n=== ${route} ===`);
    console.log(`Violations (serious/critical): ${violations.length}`);

    for (const violation of violations) {
      console.log(`  [${violation.impact}] ${violation.id}: ${violation.help}`);
      for (const node of violation.nodes.slice(0, 3)) {
        console.log(`    → ${node.target.join(' ')}`);
      }
    }

    if (violations.length > 0) failed = true;
  } catch (error) {
    failed = true;
    console.error(`Failed to scan ${route}:`, error);
  } finally {
    await browser.close();
  }
}

if (failed) {
  console.error('\nAccessibility scan found serious/critical issues.');
  process.exit(1);
}

console.log('\n✅ No serious/critical axe violations on main routes.');
