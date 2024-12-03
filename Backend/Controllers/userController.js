const userModel = require("../models/userModel");
const userService = require("../Services/userServices");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.body);

  const { fullname, email, password } = req.body;

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};
