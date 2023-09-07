const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

const User = require("./models/UserModel");
const Address = require("./models/AddressModel");

//Mongo Connection:
const connectDB = require("./config/db");
connectDB();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);

//Routes:
//1) To render the home page
app.get("/", (req, res, next) => {
  res.render("home");
});

//2) To render the register form
app.get("/register", (req, res) => {
  res.render("register");
});

//3) To get the data from the form and save it into database
app.post("/register", async (req, res, next) => {
  try {
    const { username, address, city, state, zipCode, country } = req.body;
    const user = new User();
    user.username = username;

    const newAddress = new Address();
    newAddress.address = address;
    newAddress.city = city;
    newAddress.state = state;
    newAddress.zip = zipCode;
    newAddress.country = country;

    user.address = newAddress._id;

    await user.save();
    await newAddress.save();
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

//4) To get the data from the database and display it for the user
app.get("/get-data", async (req, res, next) => {
  try {
    const registeredUsers = await User.find({}).populate("address").orFail();
    res.render("storedData", { registeredUsers });
  } catch (err) {
    next(err);
  }
});

//Error Handler
app.use((error, req, res, next) => {
  console.error(error);
  next(error);
});
app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`LISTENING on PORT ${port}`);
});
