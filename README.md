![Node.js](https://img.shields.io/badge/Node.js-v16+-green) 
![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-blue) 
![Playwright](https://img.shields.io/badge/Playwright-Automation-purple) 
![BDD](https://img.shields.io/badge/Framework-BDD-orange)

# 🚀 AutomationExercise Playwright + Cucumber BDD Framework

End-to-End Test Automation Framework built using:

* 🎭 Playwright
* 🥒 Cucumber (BDD)
* 🟦 TypeScript
* 🏗 Page Object Model (POM)
* 📊 Cucumber HTML Reporter
* 🔐 AES Encryption (crypto-js)
* 📝 Scenario-Level Runtime JSON Logging

---

# 📌 Project Overview

This framework automates test scenarios for: 👉 https://automationexercise.com/

It follows industry best practices:

* BDD approach using Cucumber
* Scalable Page Object Model (POM)
* Scenario-level isolation using CustomWorld
* Secure credential management with AES encryption
* Runtime JSON logging for execution traceability
* Screenshot capture **only on failure**
* Run-based reporting (no overwrite issues)
* Built-in retry mechanism (no rerun.txt)
* Clean lifecycle management via hooks

---

# ✅ Prerequisites

* Node.js (v16+ recommended)
* npm
* Git

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

npx playwright install
```

---

# 🏗 Folder Structure

```
AUTOMATIONEXERCISE_PLAYWRIGHT
│
├── scripts/
│   └── CLI utilities                                                   → create and manage encrypted users stored in test-data/userData.json
│
├── tests/
│   ├── features/                                                       → Gherkin scenarios
│   ├── pages/                                                                      
|      ├── BasePage.ts                                                  → base page containing common browser methods
|      ├── Page Object classes                                          → encapsulate UI locators and page-level actions
|      └── pageManager.ts                                               → lazy-load and manage page object instances
│   ├── step-definitions/                                               → Step implementations
│   │
│   ├── support/
│   │   ├── hooks/
│   │   │   └── globalHooks.ts                                          → manage test lifecycle (Before, After, AfterStep)
│   │   │
│   │   └── managers/
│   │       ├── screenshotManager.ts                                    → capture and store screenshots
│   │       └── reportManager.ts                                        → HTML report generation
│   │
│   ├── world/
│   │   └── customWorld.ts                                              → maintain scenario-specific browser and logger instances
│   │
│   ├── data/
|   |   ├── ProductData.json                                            → files store ProductData
│   │   ├── userData.json                                               → store encrypted user credentials
│   │   └── upload-file/                                                → files used for upload test scenarios
│
├── test-reports/                                                        → generated execution reports
│   └── run_YYYY-MM-DD_HH_MM_SS/
│       ├── Scenarios/                                                   → handle scenarios
│       │   ├── Scenario_Run1_.../
│       │   │   ├── log.log                                              → framework execution logs (log.log)
│       │   │   └── screenshots/                                         → screenshots captured per step/failure
│       │   ├── Scenario_Run2_.../
│       │
│       ├── downloads/                                                   → handle runtime downloaded files
│       ├── report.html                                                  → final report
│       └── main-report.json                                             → cucumber output
│
├── testLogs/
│   └── *.json                                                           → scenario-specific execution logs
│
├── utils/
│   ├── core/
│   │   ├── config.ts                                                    → handle environment configuration from .env
│   │   ├── logger.ts                                                    → framework logging using winston
│   │   ├── testLogger.ts                                                → scenario-level runtime JSON logging
│   │   ├── JsonManager.ts                                               → generic JSON read, write, update utilities
│   │   └── runContext.ts                                                → Stores global RUN_ID for execution
│   │
│   ├── data/
│   │   ├── AppDataManager.ts                                            → manage get/getAll data from Product.json
│   │   └── UserDataManager.ts                                           → manage addUser/getUser from userData.json
│   │
│   ├── helpers/
│   │   ├── encryption.ts                                                → AES encryption and decryption utilities
│   │   └── generateRandom.ts                                            → dynamic/random test data generation
│   │
│   ├── system/
│   │   └── downloadManager.ts                                           → Handles downloaded files save/read
│
├── .env                                                                 → environment configuration
├── @rerun.txt                                                           → to add failed scenarios
├── .gitignore                                                           → to add git ignore files/folders
├── cucumber.js                                                          → Cucumber runner configuration
├── package.json                                                         → project dependencies and scripts
└── tsconfig.json                                                        → TypeScript configuration
```

---

# 🧠 Framework Design Principles

## 1️⃣ Separation of Concerns

| Layer | Responsibility     |
| ----- | ------------------ |
| Pages | UI interaction     |
| Steps | Test logic         |
| Hooks | Test lifecycle     |
| World | Scenario context   |
| Utils | Reusable utilities |

---

## 2️⃣ Scenario-Level Isolation (CustomWorld)

Each scenario gets:

* New browser instance
* New context & page
* Independent TestLogger
* Unique logs & screenshots

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
testLogs/Login_Run1_2026.json
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

```
test-reports/run_xxx/report.html
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
SCREENSHOT_ON_FAILURE=false
```

Supported browsers:

- chromium
- firefox
- webkit

---

# 🏷 Tag Strategy

| Tag       | Purpose        |
| --------- | -------------- |
| @smoke    | Critical flows |
| @login    | Login          |
| @register | Registration   |

---

# 🚀 Future Enhancements

* CI/CD (GitHub Actions)
* Parallel execution
* Docker support
* Allure reporting

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

# 👨‍💻 Author

**Premdevi Kumawat**  
QA Automation Engineer  

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://www.linkedin.com/in/premdevikumawat21/)
