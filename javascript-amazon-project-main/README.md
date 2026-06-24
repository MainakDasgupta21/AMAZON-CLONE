# JavaScript Amazon Clone

This project is a browser-based Amazon clone with automated linting, type checking, unit coverage (Jasmine), and smoke tests (Playwright).

## Prerequisites

- Node.js 18+
- npm 9+

## Install

```bash
npm install
npm run test:install
```

`test:install` downloads the Playwright Chromium binary used by the automated browser tests.

## Run Locally

```bash
npm start
```

Then open these pages:

- `http://127.0.0.1:4173/amazon.html`
- `http://127.0.0.1:4173/checkout.html`
- `http://127.0.0.1:4173/orders.html`
- `http://127.0.0.1:4173/tracking.html`

## Quality Commands

- `npm run lint` - ESLint checks
- `npm run typecheck` - TypeScript-based JS project validation
- `npm run test` - Playwright suite (Jasmine + smoke flows)
- `npm run test:unit` - Jasmine runner checks only
- `npm run test:smoke` - UI smoke tests only
- `npm run check` - Runs lint + typecheck + test

## Test Coverage Scope

- Verifies Jasmine specs from `tests-jasmine/tests.html`
- Runs smoke flows for:
  - `amazon.html`
  - `checkout.html`
  - `orders.html`
  - `tracking.html`
- Fails on browser runtime errors and broken images during smoke runs
