

class RegisterBodyFragment {

    constructor() {
        this.body = $('body')
        this.registerBox= this.body.$('div[class="register-box"]')
        this.name = this.registerBox.$('input[name ="name"]')
        this.email = this.registerBox.$('input[name="email"]')
        this.password = this.registerBox.$('input[name="password"]')
        this.passwordConfirmation = this.registerBox.$('input[name="password_confirmation"]')
        this.registerButton = this.registerBox.$('button[type="submit"]')
        this.loginLink = this.registerBox.$('a[href="/login"]')
    }

}

module.exports = {
    RegisterBodyFragment
}