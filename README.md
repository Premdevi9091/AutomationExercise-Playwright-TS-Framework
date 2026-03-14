![Node.js](https://img.shields.io/badge/Node.js-v16+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-blue)
![Playwright](https://img.shields.io/badge/Playwright-Automation-purple)
![BDD](https://img.shields.io/badge/Framework-BDD-orange)

# 🚀 AutomationExercise Playwright + Cucumber BDD Framework

End-to-End Test Automation Framework built using:

- 🎭 Playwright
- 🥒 Cucumber (BDD)
- 🟦 TypeScript
- 🏗 Page Object Model (POM)
- 📊 Cucumber HTML Reporter
- 🔐 AES Encryption (crypto-js)
- 📝 Scenario-Level Runtime JSON Logging

---

# 📌 Project Overview

This framework automates test scenarios for:

👉 https://automationexercise.com/

It follows industry best practices:

- BDD approach using Cucumber
- Scalable Page Object Model (POM)
- Scenario-level isolation using CustomWorld
- Secure credential management with AES encryption
- Runtime JSON logging for execution traceability
- Screenshot capture per step/failure
- Timestamp-based HTML reporting
- Clean lifecycle management via hooks

---

# ✅ Prerequisites

Install the following before running the project:

- Node.js (v16+ recommended)
- npm
- Git

---

# 📥 Clone & Install

```bash
git clone https://github.com/Premdevi9091/AutomationExercise-Playwright-TS-Framework.git
cd automationexercise-playwright-cucumber
npm install
npx playwright install
```

---

# 🛠 Project Setup (From Scratch)

```bash
mkdir automationexercise-playwright-cucumber
cd automationexercise-playwright-cucumber
npm init -y

npm install -D typescript ts-node @types/node
npm install -D @cucumber/cucumber
npm install -D @playwright/test
npm install -D dotenv
npm install -D winston
npm install -D crypto-js
npm install -D cucumber-html-reporter
npm install -D cross-env

npx playwright install
```

---

# 🏗 Folder Structure

```
AUTOMATIONEXERCISE_PLAYWRIGHT
│
├── scripts/
│   └── CLI utilities                           → create and manage encrypted users stored in test-data/userData.json
│
├── tests/
│   ├── features/
│   │   └── Feature files (.feature)            → define BDD scenarios in Gherkin format
│   │
│   ├── pages/
│   │   ├── BasePage.ts                         → base page containing common browser methods
│   │   └── Page Object classes                 → encapsulate UI locators and page-level actions
│   │
│   └── step-definitions/
│       └── Step definitions                    → map Gherkin steps to automation logic
│
├── support/
│   ├── hooks/
│   │   └── globalHooks.ts                      → manage test lifecycle (Before, After, AfterStep)
│   ├── screenshotManager.ts                    → capture and store screenshots
│   └── reportManager.ts                        → generate timestamp-based HTML reports
│
├── utils/
│   ├── config.ts                               → handle environment configuration from .env
│   ├── testlogger.ts                           → scenario-level runtime JSON logging
│   ├── logger.ts                               → framework logging using winston
│   ├── JsonManager.ts                          → generic JSON read, write, update utilities
│   ├── encryption.ts                           → AES encryption and decryption utilities
│   ├── UserDataManager.ts                      → manage addUser/getUser from userData.json
│   ├── UIActions.ts                            → reusable wrapper methods for Playwright actions
│   ├── generateRandom.ts                       → dynamic/random test data generation
│   └── pageManager.ts                          → lazy-load and manage page object instances
│
├── world/
│   └── customWorld.ts                          → maintain scenario-specific browser and logger instances
│
├── test-data/
│   ├── userData.json                           → store encrypted user credentials
│   └── upload-file/                            → files used for upload test scenarios
│
├── test-reports/
│   ├── HTML reports                            → generated execution reports
│   ├── Screenshots                             → screenshots captured per step/failure
│   ├── logs                                    → framework execution logs (log.log)
│   └── cucumber-report.json                    → raw Cucumber JSON output
│
├── testLogs/
│   └── Runtime JSON logs                       → scenario-specific execution logs
│
├── .env                                        → environment configuration
├── cucumber.js                                 → Cucumber runner configuration
├── package.json                                → project dependencies and scripts
└── tsconfig.json                               → TypeScript configuration
```

---

# 🧠 Framework Design Principles

## 1️⃣ Separation of Concerns

| Layer | Responsibility |
|------|---------------|
| Pages | UI interaction |
| Steps | Test logic |
| Hooks | Test lifecycle |
| World | Scenario context |
| Utils | Reusable utilities |

---

## 2️⃣ Scenario-Level Isolation (CustomWorld)

Each scenario gets:

- New browser instance
- New context & page
- Independent TestLogger instance
- Unique runtime JSON log file

This ensures:

- No shared state
- Parallel-ready architecture
- Clean test execution

---

## 3️⃣ Page Manager (Lazy Page Initialization)

The framework uses a **PageManager** to dynamically create and reuse page objects.

Example:

```ts
await this.pages.get(LoginPage).loginUser()
await this.pages.get(ProductPage).clickCart()
```

Benefits:

- Avoids multiple page object instantiations
- Cleaner step definitions
- Centralized page lifecycle management

---

## 4️⃣ Runtime JSON Logging

Each scenario generates a runtime JSON file:

```
testLogs/Register_user_2026-03-03T14_25_10_123Z.json
```

Example:

```json
{
  "userDetails": {
    "Username": "TestUser2",
    "Email": "emailTestuser2@example.com"
  }
}
```

Used for:

- Debugging
- Execution tracking
- Data traceability

---

## 5️⃣ Secure Test Data Handling

Passwords are:

- Encrypted using AES (crypto-js)
- Stored in `test-data/userData.json`
- Decrypted only during runtime

Example:

```json
{
  "user1": {
    "username": "TestUser1",
    "email": "testuser1@mail.com",
    "password": "U2FsdGVkX1..."
  }
}
```

---

## 6️⃣ Reporting

After execution:

- Cucumber JSON report generated
- HTML report generated automatically

Example:

```
test-reports/report/report_03_03_2026_14_30_11/report.html
```

Report includes:

- Execution summary
- Metadata (Browser, Environment)
- Step details
- Screenshots

---

# 🔄 Test Execution Flow

1️⃣ Cucumber reads feature files  
2️⃣ Step definitions map to automation logic  
3️⃣ Hooks initialize browser & scenario context  
4️⃣ UIActions execute Playwright commands  
5️⃣ TestLogger stores runtime data  
6️⃣ Screenshots captured based on the configuration  
7️⃣ Cucumber JSON generated  
8️⃣ HTML report generated with timestamp

---

# ▶️ How To Run Tests

## 🔹 Run Full Suite

```bash
npm test
```

---

## 🔹 Run By Tag

```bash
npm run test:smoke
npm run test:register
```

---

## 🔹 Add New User (Encrypted)

```bash
npm run addUser
```

Prompts for:

- user key
- username
- email
- password (auto-encrypted)

---

# ⚙️ Environment Configuration (.env)

Example:

```
BASE_URL=https://automationexercise.com
BROWSER=chromium
HEADLESS=false
SLOW_MO=0
ENV=QA
SCREENSHOT_EACH_STEP=true
SCREENSHOT_ON_FAILURE=true
```

Supported browsers:

- chromium
- firefox
- webkit

---

# 🏷 Tag Strategy

| Tag | Purpose |
|----|----|
| @smoke | Critical test flows |
| @register | Registration scenarios |
| @login | Login functionality |

---

# 🚀 Future Enhancements

- CI/CD integration (GitHub Actions / Jenkins)
- Parallel execution support
- Docker containerization
- Allure reporting integration
- Cross-browser matrix execution

---

# 🏆 Key Highlights

- Playwright + Cucumber BDD architecture
- TypeScript-based scalable design
- Secure encrypted credentials
- Scenario-level JSON logging
- Timestamp-based reporting
- Modular and production-ready framework

---

# 👨‍💻 Author

**Premdevi Kumawat**

QA Automation Engineer
