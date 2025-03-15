const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { getCoordinatesController, getDistanceTimeController, getSuggestionsController } = require("../Controllers/mapController");
const { query } = require("express-validator");

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  getCoordinatesController
);

router.get('/get-distance-time', 
    query('origin').isString().isLength({min: 3}),
    query('destination').isString().isLength({min: 3}),
    authMiddleware.authUser,
    getDistanceTimeController

)

router.get('/get-suggestions', 
  query('input').isString().isLength({min: 3}),
  authMiddleware.authUser,
  getSuggestionsController
)

module.exports = router;
