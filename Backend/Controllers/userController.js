const userModel = require("../models/userModel");
const userService = require("../Services/userServices");
const { validationResult } = require("express-validator");
const BlacklistToken = require("../models/blacklistTokenModel");

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

module.exports.loginUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, user });
};

module.exports.getUserProfile = (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.userLogOut = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await BlacklistToken.create({ token });
  res.status(200).json({ message: "Logged out successfully" });
}
