import mongoose from "mongoose";
import bycrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  isAdmin: { type: Boolean, default: false, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Checking the password
userSchema.methods.matchPassword = async function (eneteredPassword) {
  // or userSchema.methods.comparePassword
  return await bycrypt.compare(eneteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
