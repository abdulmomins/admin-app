const express = require("express");
const adminRouter = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
} = require("../controllers/AdminController");
const protect = require("../middlewares/authenticate");
adminRouter.post("/register", registerUser);
adminRouter.post("/login", loginUser);
adminRouter.get("/logout", logoutUser);
adminRouter.get("/adminuser", protect, getUser);
adminRouter.get("/loggedin", loginStatus);
adminRouter.patch("/updateuser", protect, updateUser);
adminRouter.patch("/changepassword", protect, changePassword);
adminRouter.post("/forgotpassword", protect, forgotPassword);

module.exports = adminRouter;
