const {browser} = require("protractor");
const {LoginPage} = require('../page_objects/login')
const {RegisterPage} = require("../page_objects/registration");

describe('Registration', function () {

    const registerPage = new RegisterPage()

    it('Register modal check', async  ()=> {

        await browser.get('http://54.241.42.91:8080/register')
        await registerPage.registerModalCheck()
        await registerPage.invalidRegisterFlow()
        await registerPage.validRegisterFlow()
        await browser.close()
    });

});