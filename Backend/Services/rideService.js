const rideModel = require("../models/rideModel");
const { getDistanceTime } = require("../Services/mapService");
const crypto = require("crypto");

const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }

  const distanceTime = await getDistanceTime(pickup, destination);
  console.log(distanceTime);

  const baseFare = {
    auto: 30,
    car: 80,
    motorcycle: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 5,
  };

  const perMinuteRate = {
    auto: 2,
    car: 4,
    motorcycle: 1,
  };

  const { distance, duration } = distanceTime;

  console.log(distanceTime);

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distance.value / 1000) * perKmRate.auto +
        (duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distance.value / 1000) * perKmRate.car +
        (duration.value / 60) * perMinuteRate.car
    ),
    motorcycle: Math.round(
      baseFare.motorcycle +
        (distance.value / 1000) * perKmRate.motorcycle +
        (duration.value / 60) * perMinuteRate.motorcycle
    ),
  };
  return fare;
};

module.exports.getFareService = getFare;

const getOtp = (num) => {
  const generateOtp = (num) => {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  };
  return generateOtp(num);
};

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(4),
    fare: fare[vehicleType],
  });

  return ride;
};

module.exports.confirmRideService = async ({rideId, captain}) => {
  console.log(captain)
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captain._id,
    }
  );

  const ride = await rideModel
    .findOne({
      _id: rideId
    })
    .populate('user').populate('captain').select('+otp');

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};


module.exports.startRideService = async ({rideId, otp, captain}) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }
  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate('user').populate('captain').select('+otp');

  if (!ride) {
    throw new Error("Ride not found or invalid otp");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride is not accepted");
  }

  if (ride.captain.toString() !== captain._id.toString()) {
    throw new Error("Captain is not assigned to this ride");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );

  return ride;
}