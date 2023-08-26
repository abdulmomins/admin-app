const User = require("../models/Admin");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, profile, gender } = req.body;

  // Validation
  if (!name || !email || !password || !phone) {
    return res.status(201).send({
      error: "Please fill in all required fields",
    });
  }
  if (password.length < 6) {
    return res.status(201).send({
      error: "Password must be up to 6 characters",
    });
  }

  // Check if user email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(201).send({
      error: "Email has already been registered",
    });
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    gender,
    profile: profile || "",
  });

  //   Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, phone, profile, gender } = user;
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      gender,
      profile,
    });
  } else {
    return res.status(201).send({
      error: "Invalid user data",
    });
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate Request
  if (!email || !password) {
    return res.status(201).send({
      error: "Please fill in all required fields",
    });
  }

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(201).send({
      error: "User not found, please signup",
    });
  }

  // User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  //   Generate Token
  const token = generateToken(user._id);

  if (passwordIsCorrect) {
    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });
  }
  if (user && passwordIsCorrect) {
    const { _id, name, email, phone, profile, gender } = user;
    res.status(200).json({
      _id,
      name,
      email,
      phone,
      gender,
      profile,
    });
  } else {
    return res.status(201).send({
      error: "Invalid email or password",
    });
  }
});

// Logout user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(201).send({
    message: "Successfully Logged Out",
  });
});
// Get User Data
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, email, phone, profile, gender } = user;
    res.status(200).json({
      _id,
      name,
      email,
      phone,
      gender,
      profile,
    });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});
// Get Login Status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  // Verify token
  const verifyed = jwt.verify(token, process.env.JWT_SECRET);
  if (verifyed) {
    return res.json(true);
  }
  return res.json(false);
});
// update user
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { name, email, password, profile, phone, gender } = user;
    user.email = req.body.email || email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.profile = req.body.profile || profile;
    user.gender = req.body.gender || gender;
    user.password = req.body.password || password;
    const updateUser = await user.save();
    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      profile: updateUser.profile,
      phone: updateUser.phone,
      gender: updateUser.gender,
      password: updateUser.password,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// change password
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { oldPassword, password } = req.body;
  if (!user) {
    res.status(400);
    throw new Error("User not found , Please signup");
  }
  // validation password
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please add old and new password");
  }
  // check if old password matches password in DB
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);
  // Save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send("password change successful");
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});
//forget password
const forgotPassword = asyncHandler(async (req, res) => {
  res.send("dfsd");
});
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
};
