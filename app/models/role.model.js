module.exports = (mongoose, mongoosePaginate) => {
  var role = mongoose.Schema({
    name: {
      type: String,
    },
  });

  //convert to JSON style
  // role.method("toJSON", function () {
  //   const { __v, _id, ...object } = this.toObject();
  //   object.id = _id;
  //   return object;
  // });

  //for pagination
  role.plugin(mongoosePaginate);

  const Role = mongoose.model("Role", role);

  // const createdUser = new Role = role({
  //   name: "user"
  // }).save()

  // const createdAdmin = new Role = role({
  //   name: "Admin"
  // }).save()

  return Role;
};
