const TurfAdminModel = require('../../model/turfAdmin');
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

        let user = await TurfAdminModel.findOne({ _id: userId, active: CONSTANT.STATUS.ACTIVE });
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
            let user = await TurfAdminModel.findOne({ _id: { $ne: userId }, email: data?.email, active: CONSTANT.STATUS.ACTIVE });
            if (user) return Responder.sendFailureMessage(CommonMsg.emailExsist, res);
        }

        delete data?.password;
        let updateUser = await TurfAdminModel.findOneAndUpdate({ _id: userId, active: CONSTANT.STATUS.ACTIVE }, data, { new: true });
        if (updateUser) Responder.sendSuccessData({ user: updateUser }, UserMsg.update, res);
        else Responder.sendFailureMessage(UserMsg.update404, res);
    }

    this.deactivate = async (req, res) => {
        let token = Utils.getToken(req);
        if (!token) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let userId = await Utils.verifyToken(token);
        if (!userId) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let user = await TurfAdminModel.findOneAndUpdate({ _id: userId, active: CONSTANT.STATUS.ACTIVE }, { active: CONSTANT.STATUS.DELETE }, { new: true });
        if (user) Responder.sendSuccessMessage(UserMsg.deactivate, res);
        else Responder.sendFailureMessage(UserMsg.deactivate404, res);
    }
}

module.exports = new Controller();