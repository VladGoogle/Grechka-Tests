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
const incorrectDomainError = 'Your E-mail is incorrect, please use given email "example@portion.club"'
const emailInvalidFormatError = "The email must be a valid email address."

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
        let randomInvalidFormatValidDomainEmail = '.' + chance.email({domain: 'portion.club'})
        let randomInvalidDomainEmail = chance.email({domain: 'gmail.com'})
        let randomInvalidFormatInvalidDomainEmail = '.' + chance.email({domain: 'gmail.com'})
        let randomPassword = generator.generate({
            length: 8,
            numbers: true,
            symbols: true
        })


        //Required fields check
        await this.body.loginButton.click()
        await this.waiter.waitForElementToBeVisible(this.loginError.emailError)
        await this.expectation.expectElementToHaveText(this.loginError.emailError, emailRequiredError)
        await this.waiter.waitForElementToBeVisible(this.loginError.passwordError)
        await this.expectation.expectElementToHaveText(this.loginError.passwordError, passwordRequiredError)
        await browser.sleep(5000)

        await this.body.password.sendKeys(randomPassword)
        await this.body.loginButton.click()
        await this.waiter.waitForElementToBeVisible(this.loginError.emailError)
        await this.expectation.expectElementToHaveText(this.loginError.emailError, emailRequiredError)
        await this.waiter.waitForElementNotToBeVisible(this.loginError.passwordError)
        await browser.sleep(5000)


        await this.body.email.sendKeys(randomValidDomainEmail)
        await this.body.loginButton.click()
        await this.expectation.expectElementToHaveText(this.loginError.passwordError, passwordRequiredError)
        await this.waiter.waitForElementNotToBeVisible(this.loginError.emailError)
        await browser.sleep(5000)


        //Invalid credentials error check

        //Incorrect email - Incorrect password
        await this.body.email.sendKeys(randomValidDomainEmail)
        await this.body.password.sendKeys(randomPassword)
        await this.body.loginButton.click()
        await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError)
        await this.expectation.expectElementToHaveText(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        //Correct email - Incorrect password
        await this.body.email.sendKeys(emailInput)
        await this.body.password.sendKeys(randomPassword)
        await this.body.loginButton.click()
        await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError)
        await this.expectation.expectElementToHaveText(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        //Incorrect email - Correct password
        await this.body.email.sendKeys(randomValidDomainEmail)
        await this.body.password.sendKeys(passwordInput)
        await this.body.loginButton.click()
        await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError)
        await this.expectation.expectElementToHaveText(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        //Invalid domain check
        await this.body.email.sendKeys(randomInvalidDomainEmail)
        await this.body.password.sendKeys(passwordInput)
        await this.body.loginButton.click()
        await this.waiter.waitForElementToBeVisible(this.loginError.emailError)
        await this.expectation.expectElementToHaveText(this.loginError.emailError, incorrectDomainError)
        await this.waiter.waitForElementNotToBeVisible(this.loginError.invalidCredError)
        await browser.sleep(5000)

        await this.body.email.sendKeys(randomInvalidDomainEmail)
        await this.body.loginButton.click()
        await this.waiter.waitForElementToBeVisible(this.loginError.emailError)
        await this.expectation.expectElementToHaveText(this.loginError.emailError, incorrectDomainError)
        await this.waiter.waitForElementToBeVisible(this.loginError.passwordError)
        await this.expectation.expectElementToHaveText(this.loginError.passwordError, passwordRequiredError)
        await this.waiter.waitForElementNotToBeVisible(this.loginError.invalidCredError)
        await browser.sleep(5000)


        //Invalid email format check

        //Invalid format - Valid domain - Valid Password
        await this.body.email.sendKeys(randomInvalidFormatValidDomainEmail)
        await this.body.password.sendKeys(passwordInput)
        await this.body.loginButton.click()
        await this.waiter.waitForElementToBeVisible(this.loginError.emailError)
        await this.expectation.expectElementToHaveText(this.loginError.emailError, emailInvalidFormatError)
        await browser.sleep(5000)

        //Invalid format - Invalid domain - Invalid Password
        await this.body.email.sendKeys(randomInvalidFormatInvalidDomainEmail)
        await this.body.password.sendKeys(randomPassword)
        await this.body.loginButton.click()
        await this.waiter.waitForElementToBeVisible(this.loginError.emailError)
        await this.expectation.expectElementToHaveText(this.loginError.emailError, emailInvalidFormatError)
        await browser.sleep(5000)

        //Invalid format - Invalid domain - Valid Password
        await this.body.email.sendKeys(randomInvalidFormatInvalidDomainEmail)
        await this.body.password.sendKeys(passwordInput)
        await this.body.loginButton.click()
        await this.waiter.waitForElementToBeVisible(this.loginError.emailError)
        await this.expectation.expectElementToHaveText(this.loginError.emailError, emailInvalidFormatError)
        await browser.sleep(5000)

        //Invalid format - Valid domain - Invalid Password
        await this.body.email.sendKeys(randomInvalidFormatValidDomainEmail)
        await this.body.password.sendKeys(randomPassword)
        await this.body.loginButton.click()
        await this.waiter.waitForElementToBeVisible(this.loginError.emailError)
        await this.expectation.expectElementToHaveText(this.loginError.emailError, emailInvalidFormatError)
        await browser.sleep(5000)
    }
}

module.exports = {
    LoginPage
}