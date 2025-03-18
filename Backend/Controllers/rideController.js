const { createRide, getFareService } = require("../Services/rideService");
const { validationResult } = require("express-validator");
const { getCaptainsInTheRadius, getAddressCoordinates } = require('../Services/mapService')
const { sendMessageToSocketId } = require("../socket")
const rideModel = require("../models/rideModel");

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
    res.status(201).json(ride);

    const pickupCoordinates = await getAddressCoordinates(pickup);

    const captainsInTheRadius = await getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);

    ride.otp = ""

    const rideWithUser = await rideModel.findOne({_id: ride._id}).populate("user");

    captainsInTheRadius.map(captain => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser
      })
    })

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
