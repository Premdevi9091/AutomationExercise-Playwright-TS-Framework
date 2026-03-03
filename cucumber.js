module.exports = {
    default: {
        require: [
            "src/step-definitions/*.ts",
            "support/hooks/*.ts"
        ],
        format: [
            "progress",
            "json:test-reports/cucumber-report.json"
        ],
        requireModule: ["ts-node/register"],
        paths: ["src/features/*.feature"]
    }
};