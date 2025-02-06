const UserModel = require('../../../model/user');
const Utils = require('../../../helpers/utils');
const Responder = require('../../../helpers/responder');
const CONSTANT = require('../../../helpers/constant');
const { CommonMsg } = require('../../../helpers/messages')

function Controller() {
    this.register = async (req, res) => {
        let data = req?.body;

        if (!data?.name || !data?.email || !data?.password)
            return Responder.sendFailureMessage(CommonMsg.vaildField, res);

        let user = await UserModel.findOne({ email: data?.email, active: CONSTANT.STATUS.ACTIVE });
        if (user) return Responder.sendFailureMessage(CommonMsg.emailExsist, res);

        data['password'] = Utils.hashPass(data?.password);

        let userData = await UserModel.create(data);
        if (!userData) return Responder.sendFailureMessage(CommonMsg.register404, res);

        let token = await Utils.generateToken(userData?._id);
        Responder.sendSuccessData({ token }, CommonMsg.register, res)
    }

    this.login = async (req, res) => {
        let data = req?.body;

        if (!data?.email || !data?.password)
            return Responder.sendFailureMessage(CommonMsg.vaildField, res);

        let user = await UserModel.findOne({ email: data?.email, active: CONSTANT.STATUS.ACTIVE });
        if (!user) return Responder.sendFailureMessage(CommonMsg.emailNotExsist, res);

        const userQuery = {
            email: data?.email,
            password: Utils.hashPass(data?.password),
            active: CONSTANT.STATUS.ACTIVE
        }

        let userLogin = await UserModel.findOne(userQuery);
        if (!userLogin)
            return Responder.sendFailureMessage(CommonMsg.login404, res);

        let token = await Utils.generateToken(userLogin?._id);
        Responder.sendSuccessData({ token }, CommonMsg.login, res);
    }

    this.forgetPassword = async (req, res) => {
        let data = req?.body;

        if (!data?.email || !data?.new_password)
            return Responder.sendFailureMessage(CommonMsg.vaildField, res);

        let user = await UserModel.findOne({ email: data?.email, active: CONSTANT.STATUS.ACTIVE });
        if (!user) return Responder.sendFailureMessage(CommonMsg.emailNotExsist, res);

        data['password'] = Utils.hashPass(data?.new_password);

        let updatePass = await UserModel.findOneAndUpdate({ email: data?.email, active: CONSTANT.STATUS.ACTIVE }, data, { new: true });
        if (updatePass) Responder.sendSuccessMessage(CommonMsg.passUpdate, res);
        else Responder.sendFailureMessage(CommonMsg.passUpdate404, res);
    }
}

module.exports = new Controller();
