const {LoginBodyFragment} = require('../login/fragments')
const {RegisterBodyFragment} = require('./fragments')
const {RegistrationErrors} = require('./errors')
const {Waiters} = require('../../commons')
const {Expectations} = require('../../commons')
const {Generators} = require('../../commons')
const chance = require('chance').Chance();
const generator = require('generate-password');
const rn = require('random-number');
const {browser} = require("protractor");


const nameRequiredError = "The name field is required."
const nameMinLengthError = "The name must be at least 2 characters."
const nameMaxLengthError = "The name must not be greater than 32 characters."
const emailRequiredError = "The email field is required."
const emailInvalidFormatError = "The email must be a valid email address."
const emailInvalidDomainError = "Your E-mail is incorrect, please use given email \"example@portion.club\""
const passwordRequiredError = "The password field is required."


class RegisterPage {

    constructor() {
        this.waiter = new Waiters()
        this.expectation = new Expectations()
        this.customGenerator = new Generators()
        this.registerBody = new RegisterBodyFragment()
        this.loginBody = new LoginBodyFragment()
        this.registerError = new RegistrationErrors()
    }


    async registerModalCheck() {
        await this.waiter.waitForElementToBeVisible(this.registerBody.body)
        await this.waiter.waitForElementToBeVisible(this.registerBody.name)
        await this.waiter.waitForElementToBeVisible(this.registerBody.email)
        await this.waiter.waitForElementToBeVisible(this.registerBody.password)
        await this.waiter.waitForElementToBeVisible(this.registerBody.passwordConfirmation)
        await this.waiter.waitForElementToBeVisibleAndClickable(this.registerBody.registerButton)
        await this.waiter.waitForElementToBeVisibleAndClickable(this.registerBody.loginLink)
    }

    async validRegisterFlow () {

        let randomValidName = chance.name()
        let randomValidDomainEmail = chance.email({domain: 'portion.club'})
        let randomValidPassword = await this.customGenerator.validPasswordGenerator(16)
        console.log(randomValidPassword)
        let confirmedPassword = randomValidPassword

        const emailForLogin = randomValidDomainEmail
        const passwordForLogin = randomValidPassword


        //Create user
        await this.registerBody.name.clear().then(async ()=>{
            await this.registerBody.name.sendKeys(randomValidName)
        })
        await this.registerBody.email.clear().then(async ()=>{
            await this.registerBody.email.sendKeys(randomValidDomainEmail)
        })
        await this.registerBody.password.clear().then(async ()=>{
            await this.registerBody.password.sendKeys(randomValidPassword)
        })
        await this.registerBody.passwordConfirmation.clear().then(async ()=>{
            await this.registerBody.passwordConfirmation.sendKeys(confirmedPassword)
        })



        await this.registerBody.registerButton.click()
        await  browser.sleep(5000)


        //User get redirected to the Login modal
        await this.waiter.waitForElementToBeVisible(this.loginBody.registerAccessMsg)
        await this.waiter.waitForElementToBeVisible(this.loginBody.body)
        await this.waiter.waitForElementToBeVisible(this.loginBody.loginBox)
        await this.waiter.waitForElementToBeVisible(this.loginBody.loginLogo)
        await this.waiter.waitForElementToBeVisible(this.loginBody.loginBoxMsg)
        await this.waiter.waitForElementToBeVisible(this.loginBody.email)
        await this.waiter.waitForElementToBeVisible(this.loginBody.password)
        await this.waiter.waitForElementToBeVisible(this.loginBody.rememberCheck)
        await this.waiter.waitForElementToBeVisibleAndClickable(this.loginBody.loginButton)
        await this.waiter.waitForElementToBeVisibleAndClickable(this.loginBody.resetPasswordLink)
        await this.waiter.waitForElementToBeVisibleAndClickable(this.loginBody.registerLink)


        //Login with created user
        await this.loginBody.email.sendKeys(emailForLogin)
        await this.loginBody.password.sendKeys(passwordForLogin)
        await this.loginBody.loginButton.click()
        await browser.sleep(5000)

    }

    async invalidRegisterFlow() {

        let randomValidName = chance.name()
        let randomMinInvalidName = chance.string({length: 1})
        let randomMaxInvalidName = chance.string({length: 33})
        let randomValidDomainEmail = chance.email({domain: 'portion.club'})
        let randomInvalidDomainEmail = chance.email({domain: 'gmail.com'})
        let randomValidPassword = generator.generate({
            length: 8,
            numbers: true,
            symbols: true
        })
        let validConfirmedPassword = randomValidPassword

        let randomMinInvalidPassword = generator.generate({
            length: 7,
            numbers: true,
            symbols: true
        })
        let invalidMinConfirmedPassword = randomMinInvalidPassword

        let randomMaxInvalidPassword = generator.generate({
            length: 17,
            numbers: true,
            symbols: true
        })
        let invalidMaxConfirmedPassword = randomMaxInvalidPassword

        let randomUpperInvalidPassword = generator.generate({
            length: 8,
            uppercase: false,
            numbers: true,
            symbols: true
        })
        let invalidUpperConfirmedPassword = randomUpperInvalidPassword

        let randomLowerInvalidPassword = generator.generate({
            length: 8,
            lowercase: false,
            numbers: true,
            symbols: true
        })
        let invalidLowerConfirmedPassword = randomLowerInvalidPassword

        let randomNumInvalidPassword = generator.generate({
            length: 8,
            numbers: false,
            symbols: true
        })
        let invalidNumConfirmedPassword = randomNumInvalidPassword

        let onlyLowerLettersPassword = generator.generate({
            length:8,
            uppercase: false,
            numbers: false,
            symbols: false,
        })
        let onlyLowerLettersConfirmedPassword = onlyLowerLettersPassword

        let onlyUpperLettersPassword = generator.generate({
            length:8,
            lowercase: false,
            numbers: false,
            symbols: false,
        })
        let onlyUpperLettersConfirmedPassword = onlyUpperLettersPassword

        let onlyNumbersPassword = rn({
            min: 12345678,
            integer: true
        })
        let onlyNumbersConfirmedPassword = onlyNumbersPassword

        let onlySymbolsPassword = await this.customGenerator.onlySymbolPasswordGenerator(8)
        let onlySymbolsConfirmedPassword = onlySymbolsPassword


        let invalidConfirmedPassword = generator.generate({
            length: 8,
            numbers: true,
            symbols: true
        })

        //Redirect to the register modal
        //await this.loginBody.registerLink.click()

        //Required fields check
        await this.registerBody.registerButton.click()
        await this.waiter.waitForElementToBeVisible(this.registerError.nameError)
        await this.expectation.expectElementToHaveText(this.registerError.nameError, nameRequiredError)
        await this.waiter.waitForElementToBeVisible(this.registerError.emailError)
        await this.expectation.expectElementToHaveText(this.registerError.emailError, emailRequiredError)
        await this.waiter.waitForElementToBeVisible(this.registerError.passwordError)
        await this.expectation.expectElementToHaveText(this.registerError.passwordError, passwordRequiredError)
        // await this.waiter.waitForElementToBeVisible(this.loginError.passwordRequiredError).expectation.expectElementToHaveText(this.loginError.passwordRequiredError, passwordRequiredError)
        await browser.sleep(5000)


        //Invalid min length name check
        await this.registerBody.name.sendKeys(randomMinInvalidName)
        await this.registerBody.registerButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        //Invalid max length name check
        await this.registerBody.name.clear().then(async ()=>{
            await this.registerBody.name.sendKeys(randomMaxInvalidName)
        })
        await this.registerBody.registerButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        //Invalid email domain check
        await this.registerBody.email.sendKeys(randomInvalidDomainEmail)
        await this.registerBody.registerButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        //Invalid email format check
        await this.registerBody.email.clear().then(async ()=>{
            await this.registerBody.email.sendKeys('.' + randomInvalidDomainEmail)
        })
        await this.registerBody.registerButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        //Invalid email length check
        await this.registerBody.email.clear().then(async ()=>{
            await this.registerBody.email.sendKeys('a@portion.club')
        })
        await this.registerBody.registerButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        //Invalid min length password check
        await this.registerBody.password.sendKeys(randomMinInvalidPassword)
        await this.registerBody.passwordConfirmation.sendKeys(invalidMinConfirmedPassword)
        await this.registerBody.registerButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        //Invalid max length password check
        await this.registerBody.password.clear().then(async ()=>{
            await this.registerBody.password.sendKeys(randomMaxInvalidPassword)
        })
        await this.registerBody.passwordConfirmation.clear().then(async ()=>{
            await this.registerBody.passwordConfirmation.sendKeys(invalidMaxConfirmedPassword)
        })
        await this.registerBody.registerButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)


        //Failed upper presence password check
        await this.registerBody.password.clear().then(async ()=>{
            await this.registerBody.password.sendKeys(randomUpperInvalidPassword)
        })
        await this.registerBody.passwordConfirmation.clear().then(async ()=>{
            await this.registerBody.passwordConfirmation.sendKeys(invalidUpperConfirmedPassword)
        })
        await this.registerBody.registerButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        //Failed lower presence password check
        await this.registerBody.password.clear().then(async ()=>{
            await this.registerBody.password.sendKeys(randomLowerInvalidPassword)
        })
        await this.registerBody.passwordConfirmation.clear().then(async ()=>{
            await this.registerBody.passwordConfirmation.sendKeys(invalidLowerConfirmedPassword)
        })
        await this.registerBody.registerButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        //Failed number presence password check
        await this.registerBody.password.clear().then(async ()=>{
            await this.registerBody.password.sendKeys(randomNumInvalidPassword)
        })
        await this.registerBody.passwordConfirmation.clear().then(async ()=>{
            await this.registerBody.passwordConfirmation.sendKeys(invalidNumConfirmedPassword)
        })
        await this.registerBody.registerButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        //Only lower letters password check
        await this.registerBody.password.clear().then(async ()=>{
            await this.registerBody.password.sendKeys(onlyLowerLettersPassword)
        })
        await this.registerBody.passwordConfirmation.clear().then(async ()=>{
            await this.registerBody.passwordConfirmation.sendKeys(onlyLowerLettersConfirmedPassword)
        })
        await this.registerBody.registerButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        //Only upper letters password check
        await this.registerBody.password.clear().then(async ()=>{
            await this.registerBody.password.sendKeys(onlyUpperLettersPassword)
        })
        await this.registerBody.passwordConfirmation.clear().then(async ()=>{
            await this.registerBody.passwordConfirmation.sendKeys(onlyUpperLettersConfirmedPassword)
        })
        await this.registerBody.registerButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        //Only numbers password check
        await this.registerBody.password.clear().then(async ()=>{
            await this.registerBody.password.sendKeys(onlyNumbersPassword)
        })
        await this.registerBody.passwordConfirmation.clear().then(async ()=>{
            await this.registerBody.passwordConfirmation.sendKeys(onlyNumbersConfirmedPassword)
        })
        await this.registerBody.registerButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        //Only symbols password check
        await this.registerBody.password.clear().then(async ()=>{
            await this.registerBody.password.sendKeys(onlySymbolsPassword)
        })
        await this.registerBody.passwordConfirmation.clear().then(async ()=>{
            await this.registerBody.passwordConfirmation.sendKeys(onlySymbolsConfirmedPassword)
        })
        await this.registerBody.registerButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

        //Confirm password failed check
        await this.registerBody.password.clear().then(async ()=>{
            await this.registerBody.password.sendKeys(randomValidPassword)
        })
        await this.registerBody.passwordConfirmation.clear().then(async ()=>{
            await this.registerBody.passwordConfirmation.sendKeys(invalidConfirmedPassword)
        })
        await this.registerBody.registerButton.click()
        //await this.waiter.waitForElementToBeVisible(this.loginError.invalidCredError).expectation(this.loginError.invalidCredError, invalidCredError)
        await browser.sleep(5000)

    }
}

module.exports = {
    RegisterPage
}