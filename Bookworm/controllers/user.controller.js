import User from "../model/user.js";

import jwt from "jsonwebtoken";
import multer from "multer";

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("profilePicture");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create Token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);

    //create Token
    const token = createToken(user._id);

    res.status(200).json({ username, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add profile picture
export const addProfilePicture = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.profilepicture = req.file.path;
      await user.save();

      res
        .status(200)
        .json({ message: "Profile picture uploaded successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
