module.exports = {
  default: {
    require: [
      "tests/step-definitions/**/*.ts",
      "tests/support/hooks/**/*.ts"
    ],
    format: [
      "progress",
      "json:test-reports/main-report.json",
      "rerun:@rerun.txt"
    ],
    requireModule: ["ts-node/register"],
    paths: ["tests/features/**/*.feature"]
  },

  rerun: {
    require: [
      "tests/step-definitions/**/*.ts",
      "tests/support/hooks/**/*.ts"
    ],
    format: [
      "progress",
      "json:test-reports/rerun-report.json"
    ],
    requireModule: ["ts-node/register"]
  }
};