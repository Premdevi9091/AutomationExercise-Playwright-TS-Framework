import reporter, { Options } from "cucumber-html-reporter";
import fs from "fs";
import path from "path";

const reportsRoot = "test-reports";

//get latest run folder
const runFolders = fs.readdirSync(reportsRoot)
    .filter(f => fs.statSync(path.join(reportsRoot, f)).isDirectory())
    .sort()
    .reverse();

if (runFolders.length === 0) {
    throw new Error("No test run folder found");
}

const runId = runFolders[0];
const runDir = path.join(reportsRoot, runId);

// =============================
//STEP 1: Move ALL JSON files into run folder
// =============================
const rootFiles = fs.readdirSync(reportsRoot);

const jsonFiles = rootFiles.filter(f => (f.startsWith("main-report") || f.startsWith("rerun-report")) && 
                        f.endsWith(".json"));

jsonFiles.forEach(file => {
    const oldPath = path.join(reportsRoot, file);
    const newPath = path.join(runDir, file);

    fs.renameSync(oldPath, newPath);
});

// =============================
// STEP 2: Read ALL JSON files from run folder
// =============================
const runJsonFiles = fs.readdirSync(runDir).filter(f => 
            (f.startsWith("main-report") || f.startsWith("rerun-report")) &&
            f.endsWith(".json")
);

if(runJsonFiles.length === 0){
    throw new Error("No report JSON found");
}

// =============================
// STEP 3: Merge ALL JSON files
// =============================
let mergedData: any[] = [];

runJsonFiles.forEach(file => {
    const filePath = path.join(runDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    mergedData = mergedData.concat(data);
});

//save merged file
const mergedReport = path.join(runDir, "final-report.json");
fs.writeFileSync(mergedReport, JSON.stringify(mergedData, null, 2));

// =============================
// STEP 4: Generate HTML report
// =============================
const reportPath = path.join(runDir, "report.html");

const options: Options = {
    theme: "bootstrap",
    jsonFile: mergedReport,
    output: reportPath,
    reportSuiteAsScenarios: true,
    launchReport: false,
    screenshotsDirectory: path.join(runDir, "Scenarios"),
    storeScreenshots: true,
};

reporter.generate(options);

// =============================
// STEP 5: Copy stable report (for Jenkins)
// =============================
const stableReportPath = path.resolve("test-reports", "report.html");
fs.copyFileSync(reportPath, stableReportPath);

console.log(`Report generated at: ${reportPath}`);
console.log(`Stable report copied to: ${stableReportPath}`);
