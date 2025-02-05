const { Schema, model } = require('mongoose');
const CONSTANT = require('../helpers/constant');

let options = {
    timestamps: true,
    versionkey: false
}

let turfAdminSchema = new Schema({
    name: String,
    email: String,
    phone: Object,
    password: String,
    location: Array,
    image: String,
    active: { type: Number, default: CONSTANT.STATUS.ACTIVE }
}, options);

const turfAdminModel = model('turfAdmin', turfAdminSchema);

module.exports = turfAdminModel;