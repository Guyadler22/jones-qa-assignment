# Jones QA Assignment — Playwright Automation Framework

## Project Structure

```
.
├── pages/
│   └── FormPage.ts        # Page Object — locators + actions
├── tests/
│   └── form.spec.ts       # Test specifications
├── screenshots/           # Auto-created; stores pre-submit screenshots
├── playwright.config.ts   # Playwright configuration
├── package.json
└── tsconfig.json
```

---

## Prerequisites

| Tool                                       | Minimum version   |
| ------------------------------------------ | ----------------- |
| [Node.js](https://nodejs.org/en/download/) | 18 LTS            |
| npm                                        | bundled with Node |

---

## Installation

```bash
# 1. Install Node dependencies
npm install

# 2. Install the Playwright Chromium browser
npx playwright install chromium
```

---

## Running the Tests

```bash
# Run all tests (headless)
npm test

# Run in headed mode (watch the browser)
npm run test:headed

# Open the HTML report after a run
npm run test:report
```

---

## Key Design Decisions

- **Page Object Model** — `FormPage.ts` owns all locators and actions; tests stay free of implementation details.
- **Modern Playwright locators** — `getByLabel`, `getByRole` bind to accessible attributes rather than fragile CSS selectors.
- **No hard-coded sleeps** — navigation is awaited with `page.waitForURL`; element readiness is handled by Playwright's built-in auto-waiting.
- **Retry on first failure** — `retries: 1` in the config guards against transient network flakes without masking real bugs.
