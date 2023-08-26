const User = require("../models/User");
const asyncHandler = require("express-async-handler");
// normal user created -----------
const userCreated = asyncHandler(async (req, res) => {
  const { name, profile, status } = req.body;
  // validation =============== start
  // name validation
  if (!name) {
    return res.status(201).send({
      error: "Please required name",
    });
  }
  // profile validation
  if (!profile) {
    return res.status(201).send({
      error: "Please required photo",
    });
  }
  if (!status) {
    return res.status(201).send({
      error: "Please required your status",
    });
  }
  // validation =============== end

  // Check if user name already exists
  const userName = await User.findOne({ name });

  if (userName) {
    return res.status(201).send({
      error: "Name already registered",
    });
  }

  // Check if user name already exists
  const userProfile = await User.findOne({ profile });

  if (userProfile) {
    return res.status(201).send({
      error: "Photo already registered",
    });
  }

  // Create Product
  const user = await User.create({
    name,
    status,
    profile: profile || "",
    user_id: req.user.id,
  });
  res.status(201).json(user);
});

//user find all  ====================== start
const userFind = async (req, res) => {
  try {
    const user = await User.find({ user_id: req.user.id }).populate(
      "user_id",
      "-password"
    );
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
//user find all  ====================== end

// not complete  ======================== start
const notcomplete = async (req, res) => {
  try {
    const user = await User.find({
      user_id: req.user.id,
      status: "not complete",
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
// not complete  ======================== end

//  complete  ======================== start
const complete = async (req, res) => {
  try {
    const user = await User.find({
      user_id: req.user.id,
      status: "complete",
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
//  complete  ======================== end

//  upcoming  ======================== start
const upcoming = async (req, res) => {
  try {
    const user = await User.find({
      user_id: req.user.id,
      status: "upcoming",
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
//  upcoming  ======================== end

//  deleted   ======================== start
const deleted = asyncHandler(async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(201).send({
        error: "User Not Found",
      });
    }
    return res.status(201).send({
      error: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(201).send({
      error: "An error occurred",
    });
  }
});
//  deleted   ======================== end

// update user ==================================== start
const update = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { name, profile, status } = req.body;
  // name validation
  if (!name) {
    return res.status(201).send({
      error: "Please required name",
    });
  }
  // profile validation
  if (!profile) {
    return res.status(201).send({
      error: "Please required photo",
    });
  }
  if (!status) {
    return res.status(201).send({
      error: "Please required your status",
    });
  }
  // validation =============== end
  if (user) {
    const { name, profile, status } = user;
    user.name = req.body.name || name;
    user.profile = req.body.profile || profile;
    user.status = req.body.status || status;
    const updateUser = await user.save();
    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      profile: updateUser.profile,
      status: updateUser.status,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// update user ==================================== end

// single user by id------------- start
const singleUser = asyncHandler(async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);

    if (!userData) {
      return res.status(201).send({
        error: "User Not Found",
      });
    }
    return res.status(201).send(userData);
  } catch (error) {
    console.error(error);
    return res.status(201).send({
      error: "An error occurred",
    });
  }
});
// single user by id------------- end

module.exports = {
  userCreated,
  userFind,
  notcomplete,
  complete,
  upcoming,
  deleted,
  update,
  singleUser,
};
