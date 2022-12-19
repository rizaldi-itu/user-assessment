module.exports = (mongoose, mongoosePaginate) => {
  var user = mongoose.Schema(
    {
      // _id: {
      //   type: mongoose.Schema.Types.ObjectId,
      // },
      username: {
        type: String,
      },
      password: String,
      name: String,
      email: String,
      role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },

      imageUrl: String,
      token: String,
      books: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          // required: true,
          // default: "",
        },
      ],
    },
    { timestamps: true }
  );

  // user.method("toJSON", function () {
  //   const { __v, _id, ...object } = this.toObject();
  //   object.id = _id;
  //   return object;
  // });

  user.plugin(mongoosePaginate);

  const User = mongoose.model("User", user);
  return User;
};
