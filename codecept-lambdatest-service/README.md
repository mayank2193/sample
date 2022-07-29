
# codeceptjs-lambdatest-service
CodeceptJS Lambdatest helper, to update Test Names, Test Results after test execution 

codeceptjs-lambdatest-service is [CodeceptJS](https://codecept.io/) helper which is to complete tests results on Lambdatest after execution. The plugin updates test name and
test results on Lambdatest using the `_passed` and `_failed` hooks.

NPM package: <https://www.npmjs.com/package/codeceptjs-lambdatest-service>

## Installation
`npm i codeceptjs-lambdatest-service --save-dev`

## Configuration

This plugin should be added in codecept.json/codecept.conf.js

Example:

```
{
...
   helper: {
     LTHelper: {
      require: 'codeceptjs-lambdatest-service',
      user: process.env.LT_USERNAME,
      key: process.env.LT_ACCESS_KEY,
      updateTestName: true,
      isApp: true
    }
   }
...
}
```
To use this helper, users must provide the Lambdatest User & Access Key as part of the configuration.

## Note
This helper should be the first helper
Use updateTestName = true to set the testname dynamically from testcases
Use isApp = true for app automation testing