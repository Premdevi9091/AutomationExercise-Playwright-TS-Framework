module.exports = {
    default: {
        require: [
            "tests/step-definitions/**/*.ts",
            "tests/support/hooks/**/*.ts"
        ],
        format: [
            "progress",
            "json:tests/test-reports/cucumber-report.json"
        ],
        requireModule: ["ts-node/register"],
        paths: ["tests/features/**/*.feature"]
    }
};