const TurfModel = require('../../model/turf');
const TurfAdminModel = require('../../model/turfAdmin');
const Responder = require('../../helpers/responder');
const Utils = require('../../helpers/utils');
const CONSTANT = require('../../helpers/constant');
const { UserMsg, CommonMsg, TurfMsg } = require('../../helpers/messages');

function Controller() {
    this.createTurf = async (req, res) => {
        let data = req?.body;

        let token = Utils.getToken(req);
        if (!token) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let userId = await Utils.verifyToken(token);
        if (!userId) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let turfAdmin = await TurfAdminModel.findOne({ _id: userId, active: CONSTANT.STATUS.ACTIVE });
        if (!turfAdmin) return Responder.sendFailureMessage(UserMsg.user404, res);

        if (!data?.name || !data?.address || !data?.working_slots || !data?.price)
            return Responder.sendFailureMessage(CommonMsg.validField, res);

        data['owner'] = userId;

        let turf = await TurfModel.create(data);
        if (turf) Responder.sendSuccessData({ turf }, TurfMsg.created, res);
        else Responder.sendFailureMessage(TurfMsg.created404, res);
    }

    this.editTurf = async (req, res) => {
        let data = req?.body;
        let id = req?.params?.id;

        let token = Utils.getToken(req);
        if (!token) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let userId = await Utils.verifyToken(token);
        if (!userId) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let turfQuery = {
            owner: Utils.returnObjectId(userId), _id: id, active: CONSTANT.STATUS.ACTIVE
        }

        let turf = await TurfModel.findOne(turfQuery);
        if (!turf) return Responder.sendFailureMessage(TurfMsg.turf404, res);

        let updateTurf = await TurfModel.findOneAndUpdate(turfQuery, data, { new: true });
        if (updateTurf) Responder.sendSuccessData({ turf: updateTurf }, TurfMsg.turfUpdate, res);
        else Responder.sendFailureMessage(TurfMsg.turfUpdate404, res);
    }

    this.turfDetail = async (req, res) => {
        let id = req?.params?.id;

        let token = Utils.getToken(req);
        if (!token) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let userId = await Utils.verifyToken(token);
        if (!userId) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let turfQuery = {
            owner: Utils.returnObjectId(userId), _id: Utils.returnObjectId(id), active: CONSTANT.STATUS.ACTIVE
        }

        let turfAggregate = [
            {
                $match: turfQuery
            },
            Utils.lookupStage('turfadmins', 'owner', '_id', 'owner', { _id: 1, name: 1, email: 1, phone: 1, address: 1 }),
            Utils.unwindStage('$owner')
        ]

        let turf = await TurfModel.aggregate(turfAggregate);
        if (!turf) Responder.sendFailureMessage(TurfMsg.turf404, res);
        else Responder.sendSuccessData({ turf }, TurfMsg.turf, res)
    }

    this.turfList = async (req, res) => {
        let query = req?.query;
        let { page, limit } = Utils.returnPageLimit(query);

        let token = Utils.getToken(req);
        if (!token) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let userId = await Utils.verifyToken(token);
        if (!userId) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let turfQuery = {
            owner: Utils.returnObjectId(userId), active: CONSTANT.STATUS.ACTIVE
        }

        let turfAggregate = [
            {
                $match: turfQuery
            },
            Utils.lookupStage('turfadmins', 'owner', '_id', 'owner', { _id: 1, name: 1, email: 1, phone: 1, address: 1 }),
            Utils.unwindStage('$owner'),
            { $skip: page * limit },
            { $limit: limit }
        ]

        let turf = await TurfModel.aggregate(turfAggregate);
        if (!turf) Responder.sendFailureMessage(TurfMsg.turf404, res);
        else Responder.sendSuccessData({ turf }, TurfMsg.turf, res)
    }

    this.deleteTurf = async (req, res) => {
        let id = req?.params?.id;

        let token = Utils.getToken(req);
        if (!token) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let userId = await Utils.verifyToken(token);
        if (!userId) return Responder.sendFailureMessage(CommonMsg.unauthorized, res);

        let turfQuery = {
            owner: Utils.returnObjectId(userId), _id: Utils.returnObjectId(id), active: CONSTANT.STATUS.ACTIVE
        }

        let deleteTurf = await TurfModel.findOneAndUpdate(turfQuery, { active: CONSTANT.STATUS.DELETE }, { new: true });
        if (deleteTurf) Responder.sendSuccessMessage(TurfMsg.deleteTurf, res);
        else Responder.sendFailureMessage(TurfMsg.deleteTurf404, res);
    }
}

module.exports = new Controller();
