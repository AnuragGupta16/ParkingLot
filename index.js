import express from 'express';
import mongoose from 'mongoose';


const app = express();
const PORT = process.env.PORT || 3000;
import { leaveSlot,getSlotByRegistrationNumber,getSlotsByColor,createParkingLot } from './controllers/ParkingController.js';

import { parkCar } from './controllers/ParkingController.js';

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.post('/api/park', parkCar);
app.post('/api/leave', leaveSlot);
app.get('/api/getSlotByRegistrationNumber', getSlotByRegistrationNumber);
app.get('/api/getSlotsByColor', getSlotsByColor);
app.post('/api/createParkingLot', createParkingLot);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/parkingDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
