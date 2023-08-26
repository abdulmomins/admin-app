const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const adminRouter = require("./routers/adminRouter");
const userRouter = require("./routers/userRouter");
const errorHandler = require("./middlewares/errorHandler");
const cookiePerser = require("cookie-parser");

const app = express();
// Middlewares ----------------
app.use(express.json());
app.use(cookiePerser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Routers Middlewares --------------
app.use("/admin", adminRouter);
app.use("/user", userRouter);
//routess----------------
app.get("/", (req, res) => {
  res.send("Home Pages");
});
// Error Middleware--------------
app.use(errorHandler);
// connect to db and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("database is connected");
      console.log(`Server is running  on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
