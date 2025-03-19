const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const {
  createRideController,
  getFareController,
  confirmRideController,
  startRideController
} = require("../Controllers/rideController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/create",
  authMiddleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "motorcycle"])
    .withMessage("Invalid vehicle type"),
  createRideController
);

router.get(
  "/get-fare",
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  authMiddleware.authUser,
  getFareController
);

router.post(
  "/confirm",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  confirmRideController
);

router.get('/start-ride', 
  authMiddleware.authCaptain,
  query('rideId').isMongoId().withMessage('Invalid ride id'),
  query('otp').isString().isLength({min: 4, max: 4}).withMessage('Invalid otp'),
  startRideController
)

module.exports = router;
