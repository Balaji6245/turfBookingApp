const { Schema, model, default: mongoose } = require('mongoose');

let options = {
    timestamps: true,
    versionkey: false
}

const turfSchema = new Schema({
    name: String,
    address: Object,
    game_type: Object,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'turfAdmin' },
    working_slots: Array,
    images: Array,
    rating: Object,
}, options);

const TurfModel = model('turf', turfSchema);

module.exports = TurfModel;