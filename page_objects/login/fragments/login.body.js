

class LoginBodyFragment {

    constructor() {
        this.body = $('body')
        this.loginBox= this.body.$('div[class="login-box"]')
        this.loginLogo = this.loginBox.$('div[class ="login-logo"]')
        this.loginBoxMsg = this.loginBox.$('p[class="login-box-msg"]')
        this.email = this.loginBox.$('input[name="email"]')
        this.password = this.loginBox.$('input[name="password"]')
        this.rememberCheck = this.loginBox.$('div[class="icheck-primary"]')
        this.loginButton = this.loginBox.$('button[type="submit"]')
        this.resetPasswordLink = this.loginBox.$('a[href="/forgot-password"]')
        this.registerLink = this.loginBox.$('a[href="/register"]')
        this.registerAccessMsg = this.loginBox.$('div[class="alert alert-success"]')
    }

}

module.exports = {
    LoginBodyFragment
}