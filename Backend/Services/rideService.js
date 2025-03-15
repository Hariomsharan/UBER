const rideModel = require("../models/rideModel");
const { getDistanceTime } = require("../Services/mapService");
const crypto = require("crypto");

const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }

  const distanceTime = await getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 50,
    car: 100,
    motorcycle: 30,
  };

  const perKmRate = {
    auto: 10,
    car: 20,
    motorcycle: 15,
  };

  const perMinuteRate = {
    auto: 2,
    car: 5,
    motorcycle: 3,
  };

  const { distance, duration } = distanceTime;

  console.log(distanceTime);

  const fare = {
    auto:
      baseFare.auto +
      (distance.value / 1000) * perKmRate.auto +
      (duration.value / 60) * perMinuteRate.auto,
    car:
      (distance.value / 1000) * perKmRate.car +
      (duration.value / 60) * perMinuteRate.car,
    motorcycle:
      baseFare.motorcycle +
      (distance.value / 1000) * perKmRate.motorcycle +
      (duration.value / 60) * perMinuteRate.motorcycle,
  };
  return fare;
};

const getOtp = (num) => {
    const generateOtp = (num) => {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


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
