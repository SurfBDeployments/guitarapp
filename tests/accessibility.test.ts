import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import type { AxeResults } from 'axe-core';
import fs from 'fs-extra';
import path from 'path';

const accessibilityTags = ['wcag2a', 'wcag2aa', 'section508'];

test('homepage ARIA accessibility meets WCAG and Section 508', async ({ page }) => {
  await page.goto('https://guitarapp-alpha.vercel.app/');
  //await expect(page.locator('main')).toBeVisible();
  await page.waitForLoadState('networkidle');

  const results: AxeResults = await new AxeBuilder({ page })
    .withTags(accessibilityTags)
    .analyze();

  const reportsDir = path.join(process.cwd(), 'axe-reports');
  await fs.ensureDir(reportsDir);

  const reportHtml = buildAxeHtmlReport(results);
  const filePath = path.join(reportsDir, 'homepage-accessibility.html');
  await fs.writeFile(filePath, reportHtml, 'utf-8');

  console.log(`Accessibility report written to: ${filePath}`);

  if (results.violations.length > 0) {
    console.log('\nAccessibility Violations Found:\n');
    for (const v of results.violations) {
      console.log(`- ${v.id} (${v.impact})`);
      console.log(`  ${v.help}`);
      console.log(`  Affected nodes:`);
      v.nodes.forEach((n) => {
        console.log(`    • ${n.target.join(', ')}`);
      });
      console.log('');
    }
  }

  expect(results.violations.length).toBe(0);
});

function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildAxeHtmlReport(results: AxeResults): string {
  const rows = results.violations
    .map((v) => {
      const nodes = v.nodes
        .map(
          (n) =>
            `<li><code>${escapeHtml(n.target.join(', '))}</code> – ${escapeHtml(
              n.html
            )}</li>`
        )
        .join('');

      return `
        <section>
          <h2>${escapeHtml(v.id)} – ${escapeHtml(v.help)}</h2>
          <p><strong>Impact:</strong> ${escapeHtml(v.impact || 'n/a')}</p>
          <p>${escapeHtml(v.description)}</p>
          <h3>Nodes</h3>
          <ul>${nodes}</ul>
          <p><a href="${escapeHtml(v.helpUrl)}" target="_blank">More info</a></p>
        </section>
        <hr />
      `;
    })
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head><title>Accessibility Report</title></head>
    <body>
      <h1>Accessibility Report</h1>
      ${rows.length > 0 ? rows : '<p>No violations found!</p>'}
    </body>
    </html>
  `;
}
