const { createRide, getFareService } = require("../Services/rideService");
const { validationResult } = require("express-validator");

module.exports.createRideController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;
  try {
    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    return res.status(201).json(ride);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.getFareController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;
  try {
    const fare = await getFareService(pickup, destination);
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
