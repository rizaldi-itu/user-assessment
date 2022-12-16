module.exports = (mongoose, mongoosePaginate) => {
  var book = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: String,
      genre: String,
      rating: Number,
      published: Boolean,
      imageUrl: {
        type: String,
        default: "",
        // required: true,
      },
    },
    { timestamps: true }
  );

  //convert to JSON style
  // book.method("toJSON", function () {
  //   const { __v, _id, ...object } = this.toObject();
  //   object.id = _id;
  //   return object;
  // });

  //for pagination
  book.plugin(mongoosePaginate);

  const Book = mongoose.model("Book", book);
  return Book;
};
