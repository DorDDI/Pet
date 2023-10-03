const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
    },
    /*
    picture: {
        type: String,
        default: ''
    },
    */
    vaccinations: {
        type: String,
    },
    lastout: {
        type: String,
    },

    log: {
        type: String,
    },

});

module.exports = mongoose.model('Pets', petSchema);