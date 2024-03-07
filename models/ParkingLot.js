const mongoose = require('mongoose');

const parkingLotSchema = new mongoose.Schema({
    capacity: {
        type: Number,
        required: true,
        min: 0,
        max: 2000
    },
    parkingSpaces: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingSpace'
    }]
});

module.exports = mongoose.model('ParkingLotModel', parkingLotSchema);
