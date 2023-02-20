const dbConfig = require("../config/db.config.js");
const MongoClient = require("mongodb").MongoClient;

// MongoClient.connect(
//   "mongodb://localhost:27017/mydatabase",
//   function (err, client) {
//     if (err) throw err;

//     const db = client.db("mydatabase");
//     const collection = db.collection("mycollection");

//     const changeStream = collection.watch();

//     changeStream.on("change", function (change) {
//       console.log("Document has been inserted/updated:", change);
//     });
//   }
// );

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);

const db = {};
db.mongoose = mongoose;
db.url = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
db.user = require("./user.model.js")(mongoose, mongoosePaginate);
db.book = require("./book.model.js")(mongoose, mongoosePaginate);
db.role = require("./role.model.js")(mongoose, mongoosePaginate);

db.ROLES = ["user", "admin"];

module.exports = db;
