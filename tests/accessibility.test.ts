import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import type { AxeResults } from 'axe-core';
import { createHtmlReport } from 'axe-html-reporter';

import * as fs from 'fs-extra';
import * as path from 'node:path';
import { writeFile } from 'node:fs/promises';

const accessibilityTags = ['wcag2a', 'wcag2aa', 'section508'];

test('homepage ARIA accessibility meets WCAG and Section 508', async ({ page }) => {
  await page.goto('https://guitarapp-alpha.vercel.app/');
  await page.waitForLoadState('networkidle');

  const results: AxeResults = await new AxeBuilder({ page })
    .withTags(accessibilityTags)
    .analyze();

  const reportsDir = path.join(process.cwd(), 'axe-reports');
  await fs.ensureDir(reportsDir);

  const reportHtml = createHtmlReport({ results });
  const filePath = path.join(reportsDir, 'homepage-accessibility.html');
  await writeFile(filePath, reportHtml, 'utf-8');

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