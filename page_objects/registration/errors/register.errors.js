


class RegistrationErrors {

    constructor() {
        this.body = $('body')
        this.nameError = this.body.$('small[id="error-name"]')
        this.emailError = this.body.$('small[id="error-email"]')
        this.passwordError = this.body.$('small[id="error-password"]')
    }
}

module.exports = {
    RegistrationErrors
}