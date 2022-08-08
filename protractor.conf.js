const conf = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./specs/**/*.spec.js'],
    framework:'mocha',
    mochaOpts:{
        timeout: 180000,
    },
    onPrepare(){
        browser.waitForAngularEnabled(false)
    },
    directConnect: true,
    SELENIUM_PROMISE_MANAGER: false,
    restartBrowserBetweenTests: true
};

exports.config = conf