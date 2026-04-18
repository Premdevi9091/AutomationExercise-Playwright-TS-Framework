module.exports = {
  default: {
    require: [
      "tests/step-definitions/**/*.ts",
      "tests/support/hooks/**/*.ts"
    ],
    format: [
      "progress",
      `json:test-reports/main-report-${process.pid}.json`,
      "rerun:@rerun.txt"
    ],
    requireModule: ["ts-node/register"],
    paths: ["tests/features/**/*.feature"],

    //tags
    tags: "@smoke or @contactus or @home or @subscription or @testcases",

    //retry configuration
    retry: 0,

    //parallel execution
    parallel: 3
  }
};

console.log("Running with parallel config");