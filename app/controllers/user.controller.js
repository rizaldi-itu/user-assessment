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
const { isEmailValid } = require("../middlewares/validation");

const item_per_page = 3;

exports.signUp = async (req, res, next) => {
  if (!req.body.username) {
    res.send({ message: "Please Insert Username" });
  } else {
    if (!req.body.password) {
      res.send({ message: "Please Insert Password" });
    } else {
      if (!req.body.password2) {
        res.send({ message: "Please Insert Confirm Password" });
      } else {
        if (!req.body.name) {
          res.send({ message: "Please Insert Name" });
        } else {
          if (!req.body.email) {
            res.send({ message: "Please Insert Email" });
          } else {
            const checkEmail = await isEmailValid(req.body.email);
            if (!checkEmail.validators.regex.valid) {
              res.send({ message: "Please Insert Correct Email" });
            } else {
              if (!req.file) {
                res.send({ message: "Please Insert Image" });
              } else {
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
                    $and: [{ username: username }, { email: email }],
                  })
                    .exec()
                    .then((data) => {
                      if (data) {
                        if (data.username) {
                          return res.send({
                            message: "Username Allready Used",
                          });
                        }
                        if (data.email) {
                          return res.send({ message: "Email Allready Used" });
                        }
                      } else {
                        user.token = jwt.sign(
                          { username: username, password: password },
                          config.secret
                        );
                        user.save(user).then((data) => {
                          return res.send({ message: "Sign Up Success", data });
                          // user.token = jwt.sign(
                          //   { username: username, password: password },
                          //   config.secret
                          // );
                          // const query = { _id: [data._id] };
                          // const update = { token: user.token };
                          // User.updateOne(query, update, (err, result) => {
                          //   if (err) {
                          //     return res.send({ message: "Update failed " + err });
                          //   } else {
                          //     return res.status(200).send(result);
                          //   }
                          // });
                        });
                      }
                    });
                }
              }
            }
          }
        }
      }
    }
  }
};

exports.signIn = async (req, res, next) => {
  if (req.username && req.password) {
    res.status(200).send({
      message: "Login with Token Success, Account username = " + req.username,
    });
  } else {
    if (!req.body.username) {
      res.send({ message: "Please Insert Username" });
    } else {
      if (!req.body.password) {
        res.send({ message: "Please Insert Password" });
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
            res.status(200).send({
              message:
                "Login with username & password Success, Account username = " +
                user.username,
              user,
            });
          }
        });
      }
    }
  }
};

exports.updateUser = async (req, res, next) => {
  // res.send(req.didl);

  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  } else {
    if (!req.query) {
      res.status(400).send({
        message: "Data to update can not be empty!",
      });
    } else {
      User.findOne({ username: req.body.username })
        .exec()
        .then((data) => {
          if (data) {
            // res.send(data);
            res.json({
              message: "Username Already Used!",
            });
          } else {
            User.findOne({ email: req.body.email })
              .exec()
              .then((data) => {
                if (data) {
                  res.json({
                    message: "Email Already Used!",
                  });
                } else {
                  const id = req.query.id;

                  const user = new User({
                    _id: id,
                    username: req.body.username,
                    name: req.body.name,
                    email: req.body.email,
                    imageUrl: req.file.path,
                  });

                  User.findByIdAndUpdate(id, user, { useFindAndModify: true })
                    .then((data) => {
                      if (!data) {
                        res.status(404).send({
                          message: `Cannot update User with id=${id}. Maybe User was not found!`,
                        });
                      } else {
                        // res.send(data);
                        User.findOne({ _id: id })
                          .exec()
                          .then((data) => {
                            res.send({
                              message:
                                "Success update data in database with id=" + id,
                              data: data,
                            });
                          });
                      }
                    })
                    .catch((err) => {
                      res.status(500).send({
                        message: "Error retrieving Book with id=" + id + err,
                      });
                    });
                }
              });
          }
        });
    }
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

exports.checkUser = async (req, res, next) => {
  if (req.query.id) {
    User.findOne({ _id: req.query.id }).then((data) => {
      res.send({ message: "Check My Profile Success", data });
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
