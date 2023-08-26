const express = require("express");
const userRouter = express.Router();
const protect = require("../middlewares/authenticate");
const {
  userCreated,
  userFind,
  notcomplete,
  complete,
  upcoming,
  deleted,
  update,
  singleUser,
} = require("../controllers/userController");

//routes
// GET || all blogs
userRouter.get("/users", protect, userFind);
// GET || single blogs
userRouter.get("/user/:id", protect, singleUser);
//POST || create blog
userRouter.post("/adduser", protect, userCreated);
//get notcomplete
userRouter.get("/notcomplete", protect, notcomplete);
//get complete
userRouter.get("/complete", protect, complete);
//get upcoming
userRouter.get("/upcoming", protect, upcoming);
//DELETE || delete blog
userRouter.delete("/deleted/:id", protect, deleted);
//UPDATE || update blog
userRouter.put("/update/:id", protect, update);

module.exports = userRouter;
