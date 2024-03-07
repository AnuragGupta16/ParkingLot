const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    }
});

const Car = mongoose.model('Car', carSchema);

export default Car;
