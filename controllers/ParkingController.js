import ParkingLot from "../handlers/ParkingLot.js";

// Controller function to park a car
export const parkCar = async (req, res) => {
    const { registrationNumber, color } = req.body;
    try {
        const slotNumber = await ParkingLot.park({ registrationNumber, color });
        if (slotNumber === null) {
            return res.status(400).json({ isSuccess: false, error: { reason: 'Parking lot is full' } });
        }
        res.json({
            isSuccess: true,
            response: {
                message: `Car with registration number ${registrationNumber} and color ${color} parked at slot ${slotNumber}`,
                slotNumber,
                status: 'PARKED'
            }
        });
    } catch (error) {
        console.error('Error parking car:', error);
        res.status(500).json({ isSuccess: false, error: { reason: 'An error occurred while parking the car' } });
    }
};

// Controller function to leave a slot
export const leaveSlot = async (req, res) => {
    const { parkingLotId, registrationNumber, color } = req.body;
    try {
        const slotNumber = await ParkingLot.leave(parkingLotId, registrationNumber, color);
        if (slotNumber === null) {
            return res.status(404).json({ isSuccess: false, error: { reason: `Car with registration number ${registrationNumber} and color ${color} not found or is not parked in this parking lot` } });
        }
        res.json({
            isSuccess: true,
            response: {
                slotNumber,
                registrationNumber,
                status: 'LEFT'
            }
        });
    } catch (error) {
        console.error('Error leaving slot:', error);
        res.status(500).json({ isSuccess: false, error: { reason: 'An error occurred while leaving the slot' } });
    }
};

// Controller function to get registration number by color
export const getRegistrationNumberByColor = async (req, res) => {
    const { color, parkingLotId } = req.query;
    try {
        const registrations = await ParkingLot.getRegistrationNumberByColor(color, parkingLotId);
        if (registrations.length === 0) {
            return res.status(404).json({ isSuccess: false, error: { reason: `No cars found with color ${color}` } });
        }
        res.json({
            isSuccess: true,
            response: {
                registrations
            }
        });
    } catch (error) {
        console.error('Error getting registration numbers by color:', error);
        res.status(500).json({ isSuccess: false, error: { reason: 'An error occurred while fetching registration numbers by color' } });
    }
};

// Controller function to get slots by color
export const getSlotsByColor = async (req, res) => {
    const { color, parkingLotId } = req.query;
    try {
        const slots = await ParkingLot.getSlotsByColor(color, parkingLotId);
        if (slots.length === 0) {
            return res.status(404).json({ isSuccess: false, error: { reason: `No cars found with color ${color}` } });
        }
        res.json({
            isSuccess: true,
            response: {
                slots
            }
        });
    } catch (error) {
        console.error('Error getting slots by color:', error);
        res.status(500).json({ isSuccess: false, error: { reason: 'An error occurred while fetching slots by color' } });
    }
};


