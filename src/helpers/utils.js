const jwt = require('jsonwebtoken');
const crypto = require('crypto')

function Utils() {

    this.generateToken = async (id) => {
        return await jwt.sign({ id: id }, process.env.JWT_SECRET)
    }

    this.hashPass = (password) => {
        return crypto.createHash('md5').update(password).digest('hex');
    }

    this.getToken = (req) => {
        let token;

        if (req?.headers?.authorization && req?.headers?.authorization.startsWith('Bearer')) {
            token = req?.headers?.authorization.split(' ')[1]
        }
        else token = null

        return token;
    }

    this.verifyToken = async (token) => {
        let decode = await jwt.verify(token, process.env.JWT_SECRET);
        if (decode)
            return decode?.id
        else return null
    }
}

module.exports = new Utils();