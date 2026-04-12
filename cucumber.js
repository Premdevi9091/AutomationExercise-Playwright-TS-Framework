module.exports = {
  default: {
    require: [
      "tests/step-definitions/**/*.ts",
      "tests/support/hooks/**/*.ts"
    ],
    format: [
      "progress",
      "json:test-reports/main-report.json"
    ],
    requireModule: ["ts-node/register"],
    paths: ["tests/features/**/*.feature"],

    //tags
    tags: "@smoke",

    //retry configuration
    retry: 1
  }
};