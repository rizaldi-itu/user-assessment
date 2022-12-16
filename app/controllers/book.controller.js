const db = require("../models");
const Book = db.book;
const User = db.user;
var bodyParser = require("body-parser");
const { application } = require("express");
// const uploadFile = require("../middlewares/upload");
const moment = require("moment");

const item_per_page = 3;

exports.inputNewBook = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const genre = req.body.genre;
  const rating = req.body.rating;
  const published = req.body.published;
  const user_id = req.query.id;

  const imageUrl = req.file.path;

  const book = new Book({
    title: title,
    description: description,
    genre: genre,
    rating: rating,
    published: published,
    imageUrl: imageUrl,
  });

  book
    // .exec()
    .save(book)
    .then((data) => {
      // res.send(data);
      const book_id = [data._id];
      const condition = { _id: user_id };
      const update = { $push: { books: book_id } };
      User.updateOne(condition, update, (err, result) => {
        if (err) {
          // Handle the error
          res.send({ message: "Update failed " + err });
        } else {
          // Update was successful
          Book.find({ _id: data._id }).then((data) => {
            const book = data;
            User.findById(req.query.id).then((data) => {
              const user = data;
              res.status(200).json({
                user: user,
                book: book,
                message:
                  "Add Book Success, This Book Registered With Your Account",
              });
            });
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

exports.checkAllBook = async (req, res, next) => {
  const page = req.query.page;

  if (page < 1) {
    res
      .status(404)
      .send({ message: "Error retrieving Book with saya juga nggak tau" });
  }

  Book.find()
    // .skip((page - 1) * item_per_page)
    .limit(page * item_per_page)
    .then((data) => {
      res.send(data);
    });
};

exports.checkBookDetail = async (req, res, next) => {
  const id = req.query.id;

  Book.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found Book with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Book with id=" + id });
    });
};

exports.updateBookDetail = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  if (!req.query) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.query.id;

  const book = new Book({
    _id: id,
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
    rating: req.body.rating,
    published: req.body.published,
    imageUrl: req.file.path,
  });

  Book.findByIdAndUpdate(id, book, { useFindAndModify: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Book with id=${id}. Maybe Book was not found!`,
        });
      } else {
        res.send({ message: "Success update data in database with id=" + id });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Book with id=" + id + err });
    });
};

exports.deleteBook = async (req, res, next) => {
  const id = req.query.id;

  Book.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Book with id=${id}. Maybe Book was not found!`,
        });
      } else {
        res.send({
          message: "Book was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Book with id=" + id,
      });
    });
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
