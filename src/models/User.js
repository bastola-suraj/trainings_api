const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    username: { type: String, required: "Username is required", unique: true },
    password: { type: String, required: "Password is required" },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) next();

  bcrypt.hash(user.password, 12, function (error, hashedPassword) {
    if (error) throw new Error("Could not hash password");
    user.password = hashedPassword;
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
