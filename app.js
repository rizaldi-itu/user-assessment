const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const multer = require("multer");
var methodOverride = require("method-override");
var bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const moment = require("moment");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//destination file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    // console.log(file.originalname);
    cb(null, Date.now() + `-` + file.originalname);
  },
});

//filter file
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// image upload
app.use(
  // multer({ storage: fileStorage, fileFilter: fileFilter }).single("imageUrl")
  multer({ storage: storage, fileFilter: fileFilter }).single("imageUrl")
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// import the routes
const bookRouter = require("./app/routes/book.routes");
const userRouter = require("./app/routes/user.routes");
app.use(bookRouter);
app.use(userRouter);

app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Origin : *");
  next();
});

// create connection with mongodb
const db = require("./app/models");
const Role = db.role;
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// create connection server
app.listen(3000, "localhost", () => {
  console.log(`Server Run on Port 3000s`);
  // initial();
});

// Role.pre("save", function (next) {
//   // Check if the field doesn't exist yet
//   if (!this.name) {
//     // Add the new field with a default value
//     this.name = "User";
//     this.name = "Admin";
//   }
//   next();
// });
