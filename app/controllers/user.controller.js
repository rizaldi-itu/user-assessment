const db = require("../models");
const User = db.user;
const Book = db.book;
const config = require("../config/auth.config");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");
var dbatebled;
const moment = require("moment");

const item_per_page = 3;

exports.signUp = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  const name = req.body.name;
  const email = req.body.email;
  const imageUrl = req.file.path;

  if (password !== password2) {
    res.send({ message: "Password Doesn't Match" });
  } else {
    const user = new User({
      username: username,
      password: bcrypt.hashSync(password, 8),
      name: name,
      email: email,
      imageUrl: imageUrl,
    });

    await User.findOne({
      $or: [{ username: username }, { email: email }],
    })
      .exec()
      .then((data) => {
        if (data) {
          if (data.username) {
            return res.send({ message: "Username Allready Used" });
          }
          if (data.email) {
            return res.send({ message: "Email Allready Used" });
          }
        } else {
          user.save(user).then((data) => {
            user.token = jwt.sign({ id: data._id }, config.secret);
            const query = { _id: [data._id] };
            const update = { token: user.token };
            User.updateOne(query, update, (err, result) => {
              if (err) {
                return res.send({ message: "Update failed " + err });
              } else {
                return res.status(200).send(result, data);
              }
            });
          });
        }
      });
  }
};

exports.signIn = async (req, res, next) => {
  if (req._id) {
    res
      .status(200)
      .send({ message: "Login with Token Success, Account ID =" + req._id });
  } else {
    User.findOne({
      username: req.body.username,
    }).exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!",
        });
      } else {
        res.status(200).send(user);
      }
      // var id = user._id;
      // var email = user.email;
      // const user1 = new User({
      //   token: token,
      // });
      // User.findByIdAndUpdate(id, user1, { useFindAndModify: true }).then(
      //   (data) => {
      //     if (!data) {
      //       res.status(404).send({
      //         message: `Cannot update User with id=${id}. Maybe User was not found!`,
      //       });
      //     } else {
      //       res.send({
      //         message: "Success update data in database with id=" + id,
      //       });
      //     }
      //   }
      // );

      // var transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: "youremail@gmail.com",
      //     pass: "yourpassword",
      //   },
      // });

      // var mailOptions = {
      //   from: "youremail@gmail.com",
      //   to: "myfriend@yahoo.com",
      //   subject: "Sending Email using Node.js",
      //   text: "That was easy!",
      // };

      // transporter.sendMail(mailOptions, function (error, info) {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log("Email sent: " + info.response);
      //   }
      // });
    });
  }
};

exports.AddBookToUser = async (req, res, next) => {
  //   res.send(req.body);
  const title = req.body.title;
  const username = req.body.username;

  await User.findOne({ username: username })
    .exec()
    .then((data) => {
      if (!data) {
        return res.send({ message: "Username Not Found" });
      } else {
        const user_id = data._id;
        const books = data.books;

        Book.findOne({ title: title })
          .exec()
          .then((data) => {
            if (!data) {
              return res.send({ message: "Book Not Found" });
            } else {
              const book_id = [data._id];

              const query = { _id: user_id };
              const update = { books: book_id };

              User.updateOne(query, update, (err, result) => {
                if (err) {
                  // Handle the error
                  return res.send({ message: "Update failed " + err });
                } else {
                  // Update was successful
                  return res.status(200).send(result);
                }
              });
            }
          });
      }
    });
};

exports.checkAllUser = async (req, res, next) => {
  if (req.query.id) {
    User.findOne({ _id: req.query.id }).then((data) => {
      res.send(data);
    });
  } else {
    const page = req.query.page;
    if (page < 1) {
      res.status(404).send({ message: "Page should more than 0" });
    }
    User.find()
      // .skip((page - 1) * item_per_page)
      .limit(page * item_per_page)
      .then((data) => {
        res.send(data);
      });
  }
};
