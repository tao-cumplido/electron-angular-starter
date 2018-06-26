// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { spawn } = require('child_process');

const { SpecReporter } = require('jasmine-spec-reporter');

let driver;

exports.config = {
    seleniumAddress: 'http://localhost:9515',
    allScriptsTimeout: 11000,
    specs: ['./src/**/*.e2e-spec.ts'],
    capabilities: {
        browserName: 'electron',
        chromeOptions: {
            binary: require('electron'),
            args: ['app=dev'],
        },
    },
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print() {},
    },
    beforeLaunch() {
        driver = spawn('./node_modules/electron-chromedriver/bin/chromedriver');
    },
    onPrepare() {
        require('ts-node').register({
            project: require('path').join(__dirname, './tsconfig.json'),
        });
        jasmine
            .getEnv()
            .addReporter(
                new SpecReporter({ spec: { displayStacktrace: true } })
            );
    },
    afterLaunch() {
        driver.kill('SIGINT');
    },
};
