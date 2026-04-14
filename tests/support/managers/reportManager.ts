import reporter, { Options } from "cucumber-html-reporter";
import fs from "fs";
import path from "path";

const reportsRoot = "test-reports";

const runFolders = fs.readdirSync(reportsRoot)
    .filter(f => fs.statSync(path.join(reportsRoot, f)).isDirectory())
    .sort()
    .reverse();

if (runFolders.length === 0) {
    throw new Error("No test run folder found");
}

const runId = runFolders[0];
const runDir = path.join(reportsRoot, runId);

// ✅ move JSON files
const sourceMain = "test-reports/main-report.json";
const sourceRerun = "test-reports/rerun-report.json";

const mainReport = path.join(runDir, "main-report.json");
const rerunReport = path.join(runDir, "rerun-report.json");
const mergedReport = path.join(runDir, "final-report.json");

if (fs.existsSync(sourceMain)) fs.renameSync(sourceMain, mainReport);
if (fs.existsSync(sourceRerun)) fs.renameSync(sourceRerun, rerunReport);

// merge logic
let jsonToUse = "";

if (fs.existsSync(mainReport) && fs.existsSync(rerunReport)) {
    const mainData = JSON.parse(fs.readFileSync(mainReport, "utf-8"));
    const rerunData = JSON.parse(fs.readFileSync(rerunReport, "utf-8"));

    const merged = [...mainData, ...rerunData];
    fs.writeFileSync(mergedReport, JSON.stringify(merged, null, 2));

    jsonToUse = mergedReport;
} else if (fs.existsSync(mainReport)) {
    jsonToUse = mainReport;
} else if (fs.existsSync(rerunReport)) {
    jsonToUse = rerunReport;
} else {
    throw new Error("No report JSON found");
}

// ✅ HTML in root
const reportPath = path.join(runDir, "report.html");

const options: Options = {
    theme: "bootstrap",
    jsonFile: jsonToUse,
    output: reportPath,
    reportSuiteAsScenarios: true,
    launchReport: false,
    screenshotsDirectory: path.join(runDir, "Scenarios"),
    storeScreenshots: true,
};

reporter.generate(options);
const stableReportPath = path.resolve("test-reports", "report.html");
fs.copyFileSync(reportPath, stableReportPath);

console.log(`Report generated at: ${reportPath}`);
console.log(`Stable report copied to: ${stableReportPath}`);
