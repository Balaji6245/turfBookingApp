const { Schema, model } = require('mongoose');
const CONSTANT = require('../helpers/constant')

let options = {
    timestamps: true,
    versionkey: false
}

let userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    image: String,
    address: Object,
    phone: Object,
    active: { type: Number, default: CONSTANT.STATUS.ACTIVE },
    user_type: String // Employee, Single
}, options);

const UserModel = model('user', userSchema);

module.exports = UserModel;