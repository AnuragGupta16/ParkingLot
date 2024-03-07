import ParkingLotModel from '../models/ParkingLot.js';
import ParkingSpace from '../models/ParkingSpace.js';
import Car from '../models/Car.js';

class ParkingLot {
    constructor(capacity) {
        this.capacity = capacity;
    }

    static async createParkingLot(capacity) {
        try {
            const parkingLot = new ParkingLotModel({ capacity });
            await parkingLot.save();
            return parkingLot;
        } catch (error) {
            throw new Error('An error occurred while creating the parking lot');
        }
    }

    static async park(registrationNumber, color) {
        try {
            const parkingLot = await ParkingLotModel.findOne();
            if (!parkingLot) {
                throw new Error('Parking lot not found');
            }

            const parkingSpace = await ParkingSpace.findAvailableSpace();
            if (!parkingSpace) {
                throw new Error('Parking lot is full');
            }

            const car = await Car.createCar(registrationNumber, color);
            parkingSpace.occupy(car);

            return parkingSpace.slotNumber;
        } catch (error) {
            throw new Error('An error occurred while parking the car');
        }
    }

    static async leave(parkingLotId, registrationNumber, color) {
        try {
            const parkingLot = await ParkingLotModel.findById(parkingLotId);
            if (!parkingLot) {
                throw new Error(`Parking lot with ID ${parkingLotId} not found`);
            }

            const parkingSpace = await ParkingSpace.findByCar(registrationNumber, color);
            if (!parkingSpace) {
                throw new Error(`Car with registration number ${registrationNumber} and color ${color} not found in this parking lot`);
            }

            parkingSpace.vacate();
            return parkingSpace.slotNumber;
        } catch (error) {
            throw new Error('An error occurred while leaving the slot');
        }
    }

    static async getRegistrationNumberByColor(color, parkingLotId) {
        try {
            const parkingSpace = await ParkingSpace.find({ color, parkingLotId }).populate('car', 'registrationNumber');
            if (!parkingSpace) {
                return [];
            }

            return parkingSpace.map(space => space.car.registrationNumber);
        } catch (error) {
            throw new Error('An error occurred while fetching registration numbers by color');
        }
    }

    static async getSlotsByColor(color, parkingLotId) {
        try {
            const parkingSpace = await ParkingSpace.find({ color, parkingLotId });
            if (!parkingSpace) {
                return [];
            }

            return parkingSpace.map(space => space.slotNumber);
        } catch (error) {
            throw new Error('An error occurred while fetching slots by color');
        }
    }
}

module.exports = ParkingLot;