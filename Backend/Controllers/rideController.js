const { createRide, getFareService, confirmRideService, startRideService } = require("../Services/rideService");
const { validationResult } = require("express-validator");
const { getCaptainsInTheRadius, getAddressCoordinates } = require('../Services/mapService')
const { sendMessageToSocketId } = require("../socket")
const rideModel = require("../models/rideModel");

module.exports.createRideController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {userId, pickup, destination, vehicleType } = req.body;
  try {
  console.log(req.user)
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
    console.log(error);
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


module.exports.confirmRideController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;
  try {
    console.log(req.captain)
    const ride = await confirmRideService({ rideId, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride
    })

    res.status(200).json(ride);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

module.exports.startRideController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;
  try {    
    const ride = await startRideService({ rideId, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride
    })

    res.status(200).json(ride);
  } catch (error) {
    console.log(error);    
    return res.status(400).json({ message: error.message });
  }
}