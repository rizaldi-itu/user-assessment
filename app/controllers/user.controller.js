const db = require("../models");
const User = db.user;
const Book = db.book;
const Role = db.role;
const config = require("../config/auth.config");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");
// var dbatebled;
const moment = require("moment");
const { isEmailValid } = require("../middlewares/validation");
const { object } = require("mongoose/lib/utils");
const { ObjectId } = require("mongoose/lib/types");

const item_per_page = 3;

exports.createUser = (req, res, next) => {
  if (!req.query.id) {
    res.status(401).send({ message: "Unauthorized" });
  } else {
    User.findById(req.query.id)
      .populate("role")
      .exec()
      .then(async (data) => {
        // res.send(data);
        if (data.role.name !== "admin") {
          res.status(401).send({ message: "Need Admin Role To Create User" });
        } else {
          const id_admin = data.id;
          if (!req.body.username) {
            res.status(404).send({ message: "Please Insert Username" });
          } else {
            if (!req.body.password) {
              res.status(404).send({ message: "Please Insert Password" });
            } else {
              if (!req.body.password2) {
                res
                  .status(404)
                  .send({ message: "Please Insert Confirm Password" });
              } else {
                if (!req.body.name) {
                  res.status(404).send({ message: "Please Insert Name" });
                } else {
                  if (!req.body.email) {
                    res.status(404).send({ message: "Please Insert Email" });
                  } else {
                    const checkEmail = await isEmailValid(req.body.email);
                    if (!checkEmail.validators.regex.valid) {
                      res
                        .status(404)
                        .send({ message: "Please Insert Correct Email" });
                    } else {
                      if (!req.file) {
                        res
                          .status(404)
                          .send({ message: "Please Insert Image" });
                      } else {
                        const username = req.body.username;
                        const password = req.body.password;
                        const password2 = req.body.password2;
                        const name = req.body.name;
                        const email = req.body.email;
                        const imageUrl = req.file.path;

                        if (password !== password2) {
                          res
                            .status(404)
                            .send({ message: "Password Doesn't Match" });
                        } else {
                          const user = new User({
                            username: username,
                            password: bcrypt.hashSync(password, 8),
                            name: name,
                            email: email,
                            imageUrl: imageUrl,
                          });

                          User.findOne({
                            $and: [{ username: username }, { email: email }],
                          })
                            .exec()
                            .then((data) => {
                              if (data) {
                                if (data.username) {
                                  return res.status(404).send({
                                    message: "Username Allready Used",
                                  });
                                }
                                if (data.email) {
                                  return res
                                    .status(404)
                                    .send({ message: "Email Allready Used" });
                                }
                              } else {
                                user.token = jwt.sign(
                                  { username: username, password: password },
                                  config.secret
                                );
                                Role.findOne({ name: "user" }).then((data) => {
                                  user.role = data._id;
                                  user.created_by = id_admin;
                                  user.save(user).then((data) => {
                                    return res.status(200).send({
                                      message: "Sign Up Success",
                                      data,
                                    });
                                  });
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
        }
      });
  }
};

exports.signUp = async (req, res, next) => {
  if (!req.body.username) {
    res.status(404).send({ message: "Please Insert Username" });
  } else {
    if (!req.body.password) {
      res.status(404).send({ message: "Please Insert Password" });
    } else {
      if (!req.body.password2) {
        res.status(404).send({ message: "Please Insert Confirm Password" });
      } else {
        if (!req.body.name) {
          res.status(404).send({ message: "Please Insert Name" });
        } else {
          if (!req.body.email) {
            res.status(404).send({ message: "Please Insert Email" });
          } else {
            const checkEmail = await isEmailValid(req.body.email);
            if (!checkEmail.validators.regex.valid) {
              res.status(404).send({ message: "Please Insert Correct Email" });
            } else {
              if (!req.file) {
                res.status(404).send({ message: "Please Insert Image" });
              } else {
                const username = req.body.username;
                const password = req.body.password;
                const password2 = req.body.password2;
                const name = req.body.name;
                const email = req.body.email;
                const imageUrl = req.file.path;

                if (password !== password2) {
                  res.status(404).send({ message: "Password Doesn't Match" });
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
                          return res.status(404).send({
                            message: "Username Allready Used",
                          });
                        }
                        if (data.email) {
                          return res
                            .status(404)
                            .send({ message: "Email Allready Used" });
                        }
                      } else {
                        user.token = jwt.sign(
                          { username: username, password: password },
                          config.secret
                        );
                        Role.findOne({ name: "user" }).then((data) => {
                          user.role = data._id;
                          user.created_by = "public";
                          user.save(user).then((data) => {
                            return res
                              .status(200)
                              .send({ message: "Sign Up Success", data });
                          });
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
      res.status(404).send({ message: "Please Insert Username" });
    } else {
      if (!req.body.password) {
        res.status(404).send({ message: "Please Insert Password" });
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
  if (!req.body.email) {
    return res.status(404).send({ message: "Please fill your Email" });
  } else {
    const checkEmail = await isEmailValid(req.body.email);
    if (!checkEmail.validators.regex.valid) {
      return res.status(403).send({ message: "Please fill Email Correctly" });
    } else {
      if (!req.query.id) {
        return res.status(401).send({ message: "You Should Sign In Already" });
      } else {
        User.findOne({ _id: req.query.id })
          .exec()
          .then((data) => {
            if (!data) {
              return res.status(404).send({ message: "Account Not Found" });
            } else {
              if (!req.body.username) {
                return res
                  .status(404)
                  .send({ message: "Please fill your Username" });
              } else {
                if (!req.body.name) {
                  return res
                    .status(404)
                    .send({ message: "Please fill your Name" });
                } else {
                  if (!req.file) {
                    return res
                      .status(404)
                      .send({ message: "Please fill your Photo" });
                  } else {
                    User.findOne({ username: req.body.username })
                      .exec()
                      .then((data) => {
                        if (data) {
                          res.status(404).send({
                            message: "Username Already Used!",
                          });
                        } else {
                          User.findOne({ email: req.body.email })
                            .exec()
                            .then((data) => {
                              if (data) {
                                res.status(404).send({
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

                                User.findByIdAndUpdate(id, user, {
                                  useFindAndModify: true,
                                })
                                  .then((data) => {
                                    if (!data) {
                                      res.status(404).send({
                                        message: `Cannot update User with id = ${id}. Maybe User was not found!`,
                                      });
                                    } else {
                                      User.findOne({ _id: id })
                                        .exec()
                                        .then((data) => {
                                          res.status(200).send({
                                            message:
                                              "Success update data in database with id = " +
                                              id,
                                            data: data,
                                          });
                                        });
                                    }
                                  })
                                  .catch((err) => {
                                    res.status(500).send({
                                      message:
                                        "Error retrieving Book with id=" +
                                        id +
                                        err,
                                    });
                                  });
                              }
                            });
                        }
                      });
                  }
                }
              }
            }
          });
      }
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
  if (!req.query.id) {
    res.status(401).send({ message: "You Need Sign In First!" });
  } else {
    User.findById(req.query.id)
      .populate("role")
      .exec()
      .then((data) => {
        // res.send(data);
        // process.exit();
        if (!data) {
          res.status(404).send({ message: "User Not found!" });
        } else {
          if (data.role.name === "admin") {
            admin_data = data;
            if (!req.query.page) {
              res
                .status(400)
                .send({ message: "You should set default Page = 1" });
            } else {
              const page = req.query.page;
              if (page < 1) {
                res.status(400).send({ message: "Page should more than 0" });
              }
              User.find()
                // .skip((page - 1) * item_per_page)
                .limit(page * item_per_page)
                .then((data) => {
                  res.status(200).send({
                    message: "Check Self and All User Success",
                    data_admin: admin_data,
                    data_user: data,
                  });
                });
            }
          } else {
            User.findOne({ _id: req.query.id }).then((data) => {
              if (!data) {
                res.status(404).send({ message: "Account Not Found" });
              } else {
                res
                  .status(200)
                  .send({ message: "Check My Profile Success", data });
              }
            });
          }
        }
      });
  }
};

exports.deleteUser = async (req, res, next) => {
  if (!req.query.id) {
    res.status(401).send({
      message: "You Should Sign in First",
    });
  } else {
    User.findById(req.query.id)
      .populate("role")
      .exec()
      .then(async (data) => {
        if (data.role.name !== "admin") {
          res.status(401).send({
            message: "Role Admin Needed to delete User",
          });
        } else {
          if (!req.query.user_id) {
            res.status(404).send({
              message: "Select User to Delete",
            });
          } else {
            const id = req.query.user_id;
            User.findByIdAndRemove(id)
              .then((data) => {
                if (!data) {
                  res.status(404).send({
                    message: `Cannot delete User with id = ${id}. User was not found!`,
                  });
                } else {
                  res.status(200).send({
                    message: "User was deleted successfully!",
                  });
                }
              })
              .catch((err) => {
                res.status(500).send({
                  message: "Could not delete User with id = " + id,
                });
              });
          }
        }
      });
  }

  //
};
