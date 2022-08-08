


class LoginErrors {

    constructor() {
        this.body = $('body')
        this.emailRequiredError = this.body.$('small[id="error-name"]')
        this.passwordRequiredError = this.body.$(" small:contains('The password field is required.') ")
        this.invalidCredError = this.body.$(" small:contains('Invalid credentials') ")
        this.invalidEmailError = this.body.$(" small:contains('The email must be a valid email address.') ")
        this.incorrectDomainError = this.body.$(" small:contains(Your E-mail is incorrect, please use given email \"example@portion.club\") ")
    }
}

module.exports = {
    LoginErrors
}