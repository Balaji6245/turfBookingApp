const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { default: mongoose } = require('mongoose');

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

    this.returnObjectId = (id) => {
        return new mongoose.Types.ObjectId(id)
    }

    this.lookupStage = (from, local, foreign, as, project) => {
        return {
            $lookup: {
                from: from,
                localField: local,
                foreignField: foreign,
                pipeline: [{
                    $project: project
                }],
                as: as
            }
        }
    }

    this.unwindStage = (path) => {
        return {
            $unwind: {
                path: path,
                preserveNullAndEmptyArrays: true
            }
        }
    }

    this.returnPageLimit = (query) => {
        let page = parseInt(query?.page ?? 1) - 1;
        let limit = parseInt(query?.limit ?? 10)

        return { page, limit }
    }
}

module.exports = new Utils();