const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let beaconSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    id: {
        type: String,
        required: [true, 'El ID es necesario']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es necesaria']
    }
});

beaconSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único.' })
module.exports = mongoose.model('Beacon', beaconSchema);