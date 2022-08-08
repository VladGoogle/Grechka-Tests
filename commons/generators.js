class Generators{

    async onlySymbolPasswordGenerator(length){
        let result = '';
        const characters = '.+*?^$()[]{}|_%#!~@,-=&\/:;<>';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    async validPasswordGenerator(length) {
        let passwordLength = length,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        let i = 0, n = charset.length;
        for (; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
}

module.exports = {
    Generators
}