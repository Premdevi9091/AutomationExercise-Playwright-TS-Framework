![Node.js](https://img.shields.io/badge/Node.js-v16+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-blue)
![Playwright](https://img.shields.io/badge/Playwright-Automation-purple)
![BDD](https://img.shields.io/badge/Framework-BDD-orange)

# 🚀 AutomationExercise Playwright + Cucumber BDD Framework
End-to-End Test Automation Framework built using:

- 🎭 Playwright
- 🥒 Cucumber (BDD)
- 🟦 TypeScript
- 🔐 AES Encryption (crypto-js)
- 📝 Scenario-Level Runtime JSON Logging
- 📊 Cucumber HTML Reporter
- 🏗 Page Object Model (POM)

# 📌 Project Overview

This framework automates test scenarios for:

👉 https://automationexercise.com/

It follows industry best practices:

- BDD approach using Cucumber
- Scalable Page Object Model (POM) design
- Scenario-level isolation using CustomWorld
- Secure credential management with AES encryption
- Runtime JSON logging for traceability
- Screenshot capture per step/failure
- Timestamp-based HTML reporting
- Clean lifecycle management via hooks

# ✅ Prerequisites

- Node.js (v16+ recommended)
- npm
- Git


# 📥 Clone & Install

```bash
git clone https://github.com/Premdevi9091/AutomationExercise-Playwright-TS-Framework.git
cd automationexercise-playwright-cucumber
npm install
npx playwright install
```

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
│   │   └── Page Object classes                 → encapsulate UI locators and page-level actions
│   │
│   └── step-definitions/
│       └── Step definitions                    → map Gherkin steps to automation logic
│
├── support/
│   ├── Hooks                                   → manage test lifecycle (Before, After, AfterStep)
│   ├── screenshotManager                       → capture and store screenshots
│   └── reportManager                           → generate timestamp-based HTML reports
│
├── utils/
│   ├── config                                  → handle environment configuration from .env
│   ├── testlogger                              → handle scenario-level runtime JSON logging
│   ├── logger                                  → handle application logging using winston
│   ├── jsonManager                             → handle generic JSON read, write, update operations
│   ├── encryption                              → handle AES encryption and decryption
│   ├── userDataManager                         → manage addUser/getUser from userData.json
│   ├── UIActions                               → reusable wrapper methods for Playwright actions
│   └── generateRandom                          → dynamic/random test data generation
│
├── world/
│   └── CustomWorld (Scenario Context)          → maintain scenario-specific browser and logger instances
│
├── test-data/
│   └── userData.json                           → store encrypted user credentials
│
├── test-reports/
│   ├── HTML reports                            → store generated execution reports                       
│   ├── Screenshots                             → store captured screenshots per step/failure
│   ├── logs                                    → store framework execution logs (log.log)
│   └── cucumber-report.json                    → store raw Cucumber JSON output (timestamp-based)
│
├── testLogs/
│   └── Runtime JSON logs                       → store scenario-specific execution data
│
├── .env                                        → define environment variables and execution configuration
├── cucumber.js                                 → configure Cucumber runner options and paths
└── package.json                                → define project dependencies and run scripts
```

---

# 🧠 Framework Design Principles

## 1️⃣ Separation of Concerns

| Layer | Responsibility        |
|-------|-----------------------|
| Pages | UI interaction only   |
| Steps | Test logic            |
| Hooks | Lifecycle management  |
| World | Scenario context      |
| Utils | Reusable utilities    |

## 2️⃣ Scenario-Level Isolation (CustomWorld)

Each scenario gets:

- New browser instance
- New context & page
- Independent TestLogger instance
- Unique runtime JSON file

This ensures:

- No shared state
- Parallel-ready architecture
- Clean execution

## 3️⃣ Runtime JSON Logging

Each scenario generates:

```
testLogs/Register_user_2026-03-03T14_25_10_123Z.json
```

Example:

```json
{
  "userDetails": {
    "Username": "TestUser2",
    "Email": "emailTestuser2@example.com"
  },
  "ScenarioStatus": "PASSED"
}
```

Used for:

- Debugging  
- Execution tracking  
- Data traceability  

## 4️⃣ Secure Test Data Handling

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

## 5️⃣ Reporting

After execution:

- Cucumber JSON report generated
- HTML report generated in the timestamp folder

Example: ``` test-reports/report/report_03_03_2026_14_30_11/report.html ```

Report includes:

- Execution summary
- Metadata (Browser, Environment)
- Step details
- Screenshots

# 🔄 Test Execution Flow

1. Cucumber reads feature files  
2. Step definitions map to automation logic  
3. Hooks initialize browser & scenario context  
4. UIActions execute Playwright commands  
5. TestLogger stores runtime data  
6. Screenshots captured based on the configuration  
7. Cucumber JSON generated  
8. HTML report generated with timestamp  


# ▶️ How To Run Tests

## 🔹 Run Full Suite

```bash
npm test
```

## 🔹 Run By Tag

```bash
npm run test:smoke
npm run test:register
```

## 🔹 Add New User (Encrypted)

```bash
npm run addUser
```

Prompts for:

- user key
- username
- email
- password (auto encrypted)

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

| Tag       | Purpose                |
|-----------|------------------------|
| @smoke    | Critical test flows    |
| @register | Registration scenarios |

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
- Modular and production-ready structure

---

# 👨‍💻 Author

Premdevi Kumawat, Automation Engineer  

---

# 📌 Resume-Ready Description

Designed and developed a scalable Playwright + Cucumber BDD automation framework using TypeScript with secure, encrypted test data handling, scenario-level runtime logging, dynamic reporting, and structured POM architecture.
