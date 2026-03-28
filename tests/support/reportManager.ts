import reporter, { Options } from "cucumber-html-reporter";
import fs from "fs";
import path from "path";
import { config } from "../../utils/config";

//timestamp for unique report folder
const timestamp = (() => {
    const n = new Date();
    const pad = (v: number) => String(v).padStart(2, '0');
    return `${pad(n.getDate())}-${pad(n.getMonth() + 1)}-${n.getFullYear()}_${pad(n.getHours())}_${pad(n.getMinutes())}_${pad(n.getSeconds())}`;
})();

const reportDir = `tests/test-reports/report/report_${timestamp}`;

if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
}

const reportPath = path.join(reportDir, "report.html");

//File paths
const mainReport = "tests/test-reports/main-report.json";
const rerunReport = "tests/test-reports/rerun-report.json";
const mergedReport = "tests/test-reports/final-report.json";

//Decide what to use
let jsonToUse = "";
let reportData: any[] = [];

//Case 1: both exist → merge
if (fs.existsSync(mainReport) && fs.existsSync(rerunReport)) {
    const mainData = JSON.parse(fs.readFileSync(mainReport, "utf-8"));
    const rerunData = JSON.parse(fs.readFileSync(rerunReport, "utf-8"));

    reportData = [...mainData, ...rerunData];

    fs.writeFileSync(mergedReport, JSON.stringify(reportData, null, 2));
    jsonToUse = mergedReport;
}

//Case 2: only main exists
else if (fs.existsSync(mainReport)) {
    jsonToUse = mainReport;
}

//Case 3: only rerun exists
else if (fs.existsSync(rerunReport)) {
    jsonToUse = rerunReport;
}

//Case 4: nothing exists
else {
    throw new Error("❌ No Cucumber JSON report found. Cannot generate report.");
}

//Reporter options
const options: Options = {
    theme: "bootstrap",
    jsonFile: jsonToUse,
    output: reportPath,
    reportSuiteAsScenarios: true,
    launchReport: true,
    screenshotsDirectory: "tests/test-reports/screenshots",
    storeScreenshots: true,
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

//Generate report
reporter.generate(options);

const screenshotsRoot = "tests/test-reports/screenshots";

if (fs.existsSync(screenshotsRoot)) {
    const files = fs.readdirSync(screenshotsRoot);

    files.forEach(file => {
        if (file.startsWith("After_")) {
            const filePath = path.join(screenshotsRoot, file);

            try {
                fs.unlinkSync(filePath);
            } catch (err) {
                console.warn(`⚠️ Could not delete ${file}: ${err}`);
            }
        }
    });
}
console.log(`✅ Report generated at: ${reportPath}`);