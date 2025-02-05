const UserModel = require('../../../model/user');
const Utils = require('../../../helpers/utils');
const Responder = require('../../../helpers/responder');
const CONSTANT = require('../../../helpers/constant');
const { UserMsg } = require('../../../helpers/messages')

function Controller() {
    this.register = async (req, res) => {
        let data = req?.body;

        if (!data?.name || !data?.email || !data?.password)
            return Responder.sendFailureMessage(UserMsg.vaildField, res);

        let user = await UserModel.findOne({ email: data?.email, active: CONSTANT.STATUS.ACTIVE });
        if (user) return Responder.sendFailureMessage(UserMsg.emailExsist, res);

        data['password'] = Utils.hashPass(data?.password);

        let userData = await UserModel.create(data);
        if (!userData) return Responder.sendFailureMessage(UserMsg.register404, res);

        let token = await Utils.generateToken(userData?._id);
        Responder.sendSuccessData({ token }, UserMsg.register, res)
    }

    this.login = async (req, res) => {
        let data = req?.body;

        if (!data?.email || !data?.password)
            return Responder.sendFailureMessage(UserMsg.vaildField, res);

        let user = await UserModel.findOne({ email: data?.email, active: CONSTANT.STATUS.ACTIVE });
        if (!user) return Responder.sendFailureMessage(UserMsg.emailNotExsist, res);

        const userQuery = {
            email: data?.email,
            password: Utils.hashPass(data?.password),
            active: CONSTANT.STATUS.ACTIVE
        }

        let userLogin = await UserModel.findOne(userQuery);
        if (!userLogin)
            return Responder.sendFailureMessage(UserMsg.login404, res);

        let token = await Utils.generateToken(userLogin?._id);
        Responder.sendSuccessData({ token }, UserMsg.login, res);
    }

    this.forgetPassword = async (req, res) => {
        let data = req?.body;

        if (!data?.email || !data?.new_password)
            return Responder.sendFailureMessage(UserMsg.vaildField, res);

        let user = await UserModel.findOne({ email: data?.email, active: CONSTANT.STATUS.ACTIVE });
        if (!user) return Responder.sendFailureMessage(UserMsg.emailNotExsist, res);

        data['password'] = Utils.hashPass(data?.new_password);

        let updatePass = await UserModel.findOneAndUpdate({ email: data?.email, active: CONSTANT.STATUS.ACTIVE }, data, { new: true });
        if (updatePass) Responder.sendSuccessMessage(UserMsg.passUpdate, res);
        else Responder.sendFailureMessage(UserMsg.passUpdate404, res);
    }
}

module.exports = new Controller();
