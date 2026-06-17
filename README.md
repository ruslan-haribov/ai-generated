# Task Manager + Playwright

A small Task Manager web application with end-to-end tests written in TypeScript and Playwright.

## Project structure

```
├── app/                    # Web application (vanilla HTML/CSS/JS)
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── tests/                  # Playwright E2E tests
│   └── task-manager.spec.ts
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json
└── package.json
```

## Features

The Task Manager app supports:

- Adding tasks
- Marking tasks as complete / incomplete
- Deleting tasks
- Filtering by All / Active / Completed
- Live task count stats

## Getting started

### Prerequisites

- Node.js 18+
- Yarn 4 (or npm)

### Install dependencies

```bash
yarn install
```

### Install Playwright browsers (first time only)

```bash
yarn playwright install
```

### Run the app locally

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run tests

```bash
yarn test
```

Other useful commands:

| Command | Description |
|---------|-------------|
| `yarn test:ui` | Run tests with Playwright UI mode |
| `yarn test:headed` | Run tests in a visible browser |
| `yarn test:report` | Open the HTML test report |

## Test coverage

The Playwright suite covers:

- Page load and empty state
- Adding single and multiple tasks
- Rejecting empty task submissions
- Completing and uncompleting tasks
- Deleting tasks
- Filtering by active, completed, and all tasks

Tests use `data-testid` attributes for reliable element selection.
