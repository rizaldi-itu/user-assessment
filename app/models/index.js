const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);

const db = {};
db.mongoose = mongoose;
db.url = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
db.user = require("./user.model.js")(mongoose, mongoosePaginate);
db.book = require("./book.model.js")(mongoose, mongoosePaginate);
// db.role = require("./role.model.js")(mongoose, mongoosePaginate);

// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
