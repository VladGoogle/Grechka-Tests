const {browser} = require("protractor");
const {Expectations} = require('./expectations')
const EC = protractor.ExpectedConditions

class Waiters {
    constructor() {
        this.expectation = new Expectations()
    }

    async waitForElementToBeVisible(elem, timeout = 10000, msg) {
        await browser.wait(EC.visibilityOf(elem), timeout, msg)
    }

    async waitForElementNotToBeVisible(elem, timeout = 10000, msg) {
        await browser.wait(EC.invisibilityOf(elem), timeout, msg)
    }

    async waitForElementToBeVisibleAndClickable(elem, timeout = 10000, msg) {
        await browser.wait(EC.and(EC.visibilityOf(elem), EC.elementToBeClickable(elem)), timeout, msg)
    }

    async waitForElementToContainText (elem, text, timeout = 1000, msg) {
        await browser.wait(EC.textToBePresentInElementValue(elem, text), timeout, msg)
    }
}

module.exports = {
    Waiters
}

