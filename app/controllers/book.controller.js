const db = require("../models");
const Book = db.book;
const User = db.user;
var bodyParser = require("body-parser");
const { application } = require("express");
// const uploadFile = require("../middlewares/upload");
const moment = require("moment");

const item_per_page = 3;

exports.inputNewBook = async (req, res, next) => {
  if (!req.query.id) {
    return res.status(401).send({ message: "You Should Sign In First" });
  } else {
    User.findOne({ _id: req.query.id }).then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Account Not Found" });
      } else {
        // const user = data;
        if (!req.body.title) {
          return res
            .status(404)
            .send({ message: "Please fill the Title of the Book" });
        } else {
          if (!req.body.description) {
            return res.status(404).send({
              message: "Please fill the Description of the Book",
            });
          } else {
            if (!req.body.genre) {
              return res
                .status(404)
                .send({ message: "Please fill the Genre of the Book" });
            } else {
              if (!req.body.rating) {
                return res.status(404).send({
                  message: "Please fill the Rating of the Book",
                });
              } else {
                if (!req.body.published) {
                  return res.status(404).send({
                    message: "Please check the Publish Setting of the Book",
                  });
                } else {
                  if (!req.file) {
                    return res.status(404).send({
                      message: "Please Insert the Book's Image",
                    });
                  } else {
                    const title = req.body.title;
                    const description = req.body.description;
                    const genre = req.body.genre;
                    const rating = req.body.rating;
                    const published = req.body.published;
                    const imageUrl = req.file.path;
                    const user_id = req.query.id;

                    const book = new Book({
                      title: title,
                      description: description,
                      genre: genre,
                      rating: rating,
                      published: published,
                      imageUrl: imageUrl,
                    });

                    book
                      .save(book)
                      .then((data) => {
                        const added_book = data;
                        const book_id = [data._id];
                        const condition = { _id: user_id };
                        const update = { $push: { books: book_id } };
                        User.updateOne(condition, update, (err, result) => {
                          if (err) {
                            res
                              .status(400)
                              .send({ message: "Update failed " + err });
                          } else {
                            User.findOne(condition)
                              .exec()
                              .then((data) => {
                                const user = data;
                                res.status(200).send({
                                  message:
                                    "Add Book Success, This Book Registered With Your Account",
                                  adding_user: user,
                                  added_book,
                                });
                              });
                          }
                        });
                      })
                      .catch((err) => {
                        res.status(500).send({
                          message:
                            err.message ||
                            "Some error occurred while creating the User.",
                        });
                      });
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

exports.checkAllBook = async (req, res, next) => {
  if (!req.query.id) {
    res.status(401).send({ message: "Should Sing In First" });
  } else {
    User.findOne({ _id: req.query.id }).then((data) => {
      if (!data) {
        res.status(404).send({ message: "Account Not Found" });
      } else {
        if (!req.query.page) {
          res.status(404).send({ message: "Default Page Should Be 1" });
        } else {
          const page = req.query.page;
          if (page < 1) {
            res.status(404).send({
              message: "Page should more than 0",
            });
          } else {
            Book.find()
              // .skip((page - 1) * item_per_page)
              .limit(page * item_per_page)
              .then((data) => {
                res.status(200).send(data);
              });
          }
        }
      }
    });
  }
};

exports.checkBookDetail = async (req, res, next) => {
  if (!req.query.id) {
    return res
      .status(401)
      .send({ message: "Id Not Detected, Should Sign In First" });
  } else {
    User.findOne({ _id: req.query.id })
      .exec()
      .then((data) => {
        if (!data) {
          return res.status(404).send({ message: "Account Not Found" });
        } else {
          if (!req.query.book_id) {
            return res.status(404).send({ message: "Choose Book First" });
          } else {
            const id = req.query.book_id;
            Book.findById(id)
              .then((data) => {
                if (!data) {
                  res
                    .status(404)
                    .send({ message: "Not found Book with id " + id });
                } else {
                  res.status(200).send(data);
                }
              })
              .catch((err) => {
                res
                  .status(500)
                  .send({ message: "Error retrieving Book with id=" + id });
              });
          }
        }
      });
  }
};

exports.updateBookDetail = async (req, res, next) => {
  if (!req.query.id) {
    return res.status(401).send({
      message: "Please Sign In First!",
    });
  } else {
    if (!req.query.book_id) {
      return res.status(404).send({
        message: "choose Book To Update!",
      });
    } else {
      User.findById(req.query.id)
        .exec()
        .then((data) => {
          if (!data) {
            return res.status(401).send({
              message: "User Not Found!",
            });
          } else {
            var owner = 0;
            for (i = 0; i < data.books.length; i++) {
              if (req.query.book_id == data.books[i]) {
                // console.log(req.query.book_id + " " + data.books[i]);
                owner = 1;
                continue;
              }
            }
            if (owner === 0) {
              return res.status(404).send({
                message: "You're Not The Owner Of This Book!",
              });
            } else {
              if (!req.body.title) {
                return res.status(404).send({
                  message: "Title to update can not be empty!",
                });
              } else {
                if (!req.body.description) {
                  return res.status(404).send({
                    message: "Description to update can not be empty!",
                  });
                } else {
                  if (!req.body.genre) {
                    return res.status(404).send({
                      message: "Genre to update can not be empty!",
                    });
                  } else {
                    if (!req.body.rating) {
                      return res.status(404).send({
                        message: "Rating to update can not be empty!",
                      });
                    } else {
                      if (!req.body.published) {
                        return res.status(404).send({
                          message: "Published to update can not be empty!",
                        });
                      } else {
                        if (!req.file) {
                          return res.status(404).send({
                            message: "Image to update can not be empty!",
                          });
                        } else {
                          const id = req.query.book_id;
                          const book = new Book({
                            _id: id,
                            title: req.body.title,
                            description: req.body.description,
                            genre: req.body.genre,
                            rating: req.body.rating,
                            published: req.body.published,
                            imageUrl: req.file.path,
                          });
                          Book.findByIdAndUpdate(id, book, {
                            useFindAndModify: true,
                          })
                            .then((data) => {
                              if (!data) {
                                res.status(404).send({
                                  message: `Cannot update Book with id=${id}. Maybe Book was not found!`,
                                });
                              } else {
                                res.status(200).send({
                                  message:
                                    "Success update data in database with id = " +
                                    id,
                                });
                              }
                            })
                            .catch((err) => {
                              res.status(500).send({
                                message:
                                  "Error retrieving Book with id=  " + id + err,
                              });
                            });
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
  }
};

exports.deleteBook = async (req, res, next) => {
  if (!req.query.id) {
    return res.status(401).send({
      message: "Please Sign In First!",
    });
  } else {
    if (!req.query.book_id) {
      return res.status(404).send({
        message: "choose Book To Delete!",
      });
    } else {
      User.findById(req.query.id)
        .exec()
        .then((data) => {
          if (!data) {
            return res.status(401).send({
              message: "User Not Found!",
            });
          } else {
            var owner = 0;
            for (i = 0; i < data.books.length; i++) {
              if (req.query.book_id == data.books[i]) {
                // console.log(req.query.book_id + " " + data.books[i]);
                owner = 1;
                continue;
              }
            }
            if (owner === 0) {
              return res.status(404).send({
                message: "You're Not The Owner Of This Book!",
              });
            } else {
              const id = req.query.book_id;
              Book.findByIdAndRemove(id)
                .then((data) => {
                  if (!data) {
                    res.status(404).send({
                      message: `Cannot delete Book with id = ${id}. Book was not found!`,
                    });
                  } else {
                    res.status(200).send({
                      message: "Book was deleted successfully!",
                    });
                  }
                })
                .catch((err) => {
                  res.status(500).send({
                    message: "Could not delete Book with id = " + id,
                  });
                });
            }
          }
        });
    }
  }
};

exports.checkBookDetailWithRegex = async (req, res, next) => {
  const id = req.query.id;
  const text = req.query.text;

  Book.find({
    $or: [
      { title: { $regex: text } },
      { description: { $regex: text } },
      { genre: { $regex: text } },
    ],
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found Book with title " + text });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Book with Regex=" + text });
    });
};
