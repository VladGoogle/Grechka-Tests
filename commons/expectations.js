const expect = require('chai').expect

class Expectations {

    async expectElementToHaveText (elem, text){
        const elemText = await elem.getText()
        expect(elemText).to.be.equal(text)
    }


}

module.exports = {
    Expectations
}