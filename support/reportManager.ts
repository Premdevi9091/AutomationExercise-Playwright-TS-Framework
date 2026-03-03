import reporter, { Options } from "cucumber-html-reporter";
import fs from "fs";
import path from "path";
import { config } from "../utils/config";

const timestamp = (() => {
    const n = new Date();
    const pad = (v: number) => String(v).padStart(2, '0');
    return `${pad(n.getDate())}_${pad(n.getMonth() + 1)}_${n.getFullYear()}_${pad(n.getHours())}_${pad(n.getMinutes())}_${pad(n.getSeconds())}`
})();

const reportDir = `test-reports/report/report_${timestamp}`;

if(!fs.existsSync(reportDir)){
    fs.mkdirSync(reportDir, { recursive: true});
}
const reportPath = path.join(reportDir, "report.html");
const options: Options = {
    theme: "bootstrap",
    jsonFile: "test-reports/cucumber-report.json",
    output: reportPath,
    reportSuiteAsScenarios: true,
    launchReport: false,
    metadata: {
        "Project Name": "AutomationExercise Playwright Framework",
        "Release": "1.0.0",
        "Test Environment": config.env || "QA",
        "Browser": config.browser || "chromium",
        "Platform": process.platform,
        "Executed By": "QA Engineer"
    },
    name: "Test Execution Report",
    brandTitle: "AutomationExercise Playwright"
};

reporter.generate(options);

console.log(`Report generated at ${reportPath}`);
