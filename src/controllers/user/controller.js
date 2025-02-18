const UserModel = require('../../model/user');
const Responder = require('../../helpers/responder');
const Utils = require('../../helpers/utils');
const { CommonMsg, UserMsg } = require('../../helpers/messages');
const CONSTANT = require('../../helpers/constant');

function Controller() {
    this.detail = async (req, res) => {
        let token = Utils.getToken(req);
        if (!token) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let userId = await Utils.verifyToken(token);
        if (!userId) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let user = await UserModel.findOne({ _id: userId, active: CONSTANT.STATUS.ACTIVE });
        if (user) Responder.sendSuccessData({ user }, UserMsg.user, res);
        else Responder.sendFailureMessage(UserMsg.user404, res);
    }

    this.updateProfile = async (req, res) => {
        let data = req?.body;

        let token = Utils.getToken(req);
        if (!token) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let userId = await Utils.verifyToken(token);
        if (!userId) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        if (data?.email) {
            let user = await UserModel.findOne({ _id: { $ne: userId }, email: data?.email, active: CONSTANT.STATUS.ACTIVE });
            if (user) return Responder.sendFailureMessage(CommonMsg.emailExsist, res);
        }

        delete data?.password;
        let updateUser = await UserModel.findOneAndUpdate({ _id: userId, active: CONSTANT.STATUS.ACTIVE }, data, { new: true });
        if (updateUser) Responder.sendSuccessData({ user: updateUser }, UserMsg.update, res);
        else Responder.sendFailureMessage(UserMsg.update404, res);
    }

    this.deactivate = async (req, res) => {
        let token = Utils.getToken(req);
        if (!token) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let userId = await Utils.verifyToken(token);
        if (!userId) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let user = await UserModel.findOneAndUpdate({ _id: userId, active: CONSTANT.STATUS.ACTIVE }, { active: CONSTANT.STATUS.DELETE }, { new: true });
        if (user) Responder.sendSuccessMessage(UserMsg.deactivate, res);
        else Responder.sendFailureMessage(UserMsg.deactivate404, res);
    }

    this.nearByTurfList = async (req, res) => {
        let query = req?.query;

        let token = Utils.getToken(req);
        if (!token) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let userId = await Utils.verifyToken(token);
        if (!userId) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let user = await UserModel.findOne({ _id: id, active: CONSTANT.STATUS.ACTIVE });
        if (!user) return Responder.sendFailureMessage(UserMsg.user404, res);

        // if(query?.name)

    }
}

module.exports = new Controller();