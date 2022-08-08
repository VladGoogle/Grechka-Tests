


class LoginErrors {

    constructor() {
        this.body = $('body')
        this.emailError = this.body.$('small[id="error-email"]')
        this.passwordError = this.body.$('small[id="error-password"]')
        this.invalidCredError = this.body.$('small[id="error-message"]')
    }
}

module.exports = {
    LoginErrors
}