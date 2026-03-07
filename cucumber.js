module.exports = {
    default: {
        require: [
            "tests/step-definitions/**/*.ts",
            "support/hooks/**/*.ts"
        ],
        format: [
            "progress",
            "json:test-reports/cucumber-report.json"
        ],
        requireModule: ["ts-node/register"],
        paths: ["tests/features/**/*.feature"]
    }
};