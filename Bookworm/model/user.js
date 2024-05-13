import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilepicture: {
    type: String,
  },
});

//static signup method
userSchema.statics.signup = async function (username, email, password) {
  //validation
  if (!username || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    console.log("Email:", email);
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("password is not strong Enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
