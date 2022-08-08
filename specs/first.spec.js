const {browser} = require("protractor");
const {LoginPage} = require('../page_objects/login')
const {RegisterPage} = require("../page_objects/registration");

describe('First suit', function () {

    beforeEach(() => {
        const registerPage = new RegisterPage()
        const loginPage = new LoginPage()
    });
    // const registerPage = new RegisterPage()
    // const loginPage = new LoginPage()

    it('Register modal check', async  ()=> {

        await browser.get('http://54.241.42.91:8080/register')
        await registerPage.registerModalCheck()
        await registerPage.invalidRegisterFlow()
        await registerPage.validRegisterFlow()

    });


    it('Login modal check', async  ()=> {

        //Email and password inputs
        const email = "vlad.google@portion.club"
        const password = "Asdrtyjklmnb1@"

        await browser.get('http://54.241.42.91:8080/login')
        await loginPage.loginModal()
        await loginPage.invalidLoginFlow(email, password)
        await loginPage.validLoginFlow(email, password)
    });

});