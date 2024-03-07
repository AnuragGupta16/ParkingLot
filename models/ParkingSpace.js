const mongoose = require('mongoose');

const parkingSpaceSchema = new mongoose.Schema({
    slotNumber: {
        type: Number,
        required: true
    },
    isOccupied: {
        type: Boolean,
        default: false
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        default: null
    }
});

module.exports = mongoose.model('ParkingSpace', parkingSpaceSchema);
