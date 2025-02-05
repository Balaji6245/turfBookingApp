const jwt = require('jsonwebtoken');
const crypto = require('crypto')

function Utils() {

    this.generateToken = async (id) => {
        return await jwt.sign({ id: id }, process.env.JWT_SECRET)
    }

    this.hashPass = (password) => {
        return crypto.createHash('md5').update(password).digest('hex');
    }
}

module.exports = new Utils();