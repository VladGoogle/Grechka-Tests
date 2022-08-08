const {LoginBodyFragment} = require('./fragments')
const {Waiters} = require('../../commons')
const {Expectations} = require('../../commons')
const {LoginErrors} = require('./errors')
const chance = require('chance').Chance();
const generator = require('generate-password');
const {browser} = require("protractor");

const logoText ='Proper Eating'
const loginBoxText ='Sign in to start work'
const rememberText = 'Remember Me'
const emailRequiredError = "The email field is required."
const passwordRequiredError = "The password field is required."
const invalidCredError = "Invalid credentials"
const incorrectDomainError = "Your E-mail is incorrect, please use given email \"example@portion.club\""

class LoginPage {

    constructor() {
        this.waiter = new Waiters()
        this.expectation = new Expectations()
        this.body = new LoginBodyFragment()
        this.loginError = new LoginErrors()
    }


    async loginModal() {
        await this.waiter.waitForElementToBeVisible(this.body.body)
        await this.waiter.waitForElementToBeVisible(this.body.loginBox)
        await this.waiter.waitForElementToBeVisible(this.body.loginLogo)
        await this.expectation.expectElementToHaveText(this.body.loginLogo, logoText)
        await this.waiter.waitForElementToBeVisible(this.body.loginBoxMsg)
        await this.expectation.expectElementToHaveText(this.body.loginBoxMsg, loginBoxText)
        await this.waiter.waitForElementToBeVisible(this.body.email)
        await this.waiter.waitForElementToBeVisible(this.body.password)
        await this.waiter.waitForElementToBeVisible(this.body.rememberCheck)
        await this.expectation.expectElementToHaveText(this.body.rememberCheck, rememberText)
        await this.waiter.waitForElementToBeVisibleAndClickable(this.body.loginButton)
        await this.waiter.waitForElementToBeVisibleAndClickable(this.body.resetPasswordLink)
        await this.waiter.waitForElementToBeVisibleAndClickable(this.body.registerLink)
    }

    async validLoginFlow (emailInput, passwordInput) {
        await this.body.email.sendKeys(emailInput)
        await this.body.password.sendKeys(passwordInput)
        await this.body.loginButton.click()
        await browser.sleep(10000)
    }

    async invalidLoginFlow(emailInput, passwordInput) {

        let randomValidDomainEmail = chance.email({domain: 'portion.club'})
        let randomInvalidDomainEmail = chance.email({domain: 'gmail.com'})

        let randomPassword = generator.generate({
            length: 8,
            numbers: true,
            symbols: true
        })


        //Required fields check
        await this.body.loginButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.emailRequiredError).expectation.expectElementToHaveText(this.loginError.emailRequiredError, emailRequiredError)
       // await this.waiter.waitForElementToBeVisible(this.loginError.passwordRequiredError).expectation.expectElementToHaveText(this.loginError.passwordRequiredError, passwordRequiredError)
        await browser.sleep(5000)

        await this.body.password.sendKeys(randomPassword)
        await this.body.loginButton.click()
        //await this.waiter.waitForElementNotToBeVisible(this.loginError.passwordRequiredError)
        //await this.waiter.waitForElementToBeVisible(this.loginError.emailRequiredError).expectation.expectElementToHaveText(this.loginError.emailRequiredError, emailRequiredError)
        await browser.sleep(5000)


        await this.body.email.sendKeys(randomValidDomainEmail)
        await this.body.loginButton.click()
        //await this.waiter.waitForElementNotToBeVisible(this.loginError.emailRequiredError)
        //await this.waiter.waitForElementToBeVisible(this.loginError.passwordRequiredError).expectation.expectElementToHaveText(this.loginError.passwordRequiredError, passwordRequiredError)
        await browser.sleep(5000)


        //Invalid credentials error check
        await this.body.email.sendKeys(randomValidDomainEmail)
        await this.body.password.sendKeys(randomPassword)
        await this.body.loginButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        await this.body.email.sendKeys(emailInput)
        await this.body.password.sendKeys(randomPassword)
        await this.body.loginButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        await this.body.email.sendKeys(randomValidDomainEmail)
        await this.body.password.sendKeys(passwordInput)
        await this.body.loginButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)


        //Invalid domain check
        await this.body.email.sendKeys(randomInvalidDomainEmail)
        await this.body.password.sendKeys(passwordInput)
        await this.body.loginButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.incorrectDomainError).expectation.expectElementToHaveText(this.loginError.incorrectDomainError, incorrectDomainError)
        await browser.sleep(5000)

        await this.body.email.sendKeys(randomInvalidDomainEmail)
        await this.body.loginButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.incorrectDomainError).expectation.expectElementToHaveText(this.loginError.incorrectDomainError, incorrectDomainError)
        await browser.sleep(5000)

    }
}

module.exports = {
    LoginPage
}