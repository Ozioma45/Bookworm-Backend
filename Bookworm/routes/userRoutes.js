import express from "express";

//controller function
import {
  signupUser,
  loginUser,
  addProfilePicture,
} from "../controllers/user.controller.js";

const router = express.Router();

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

//profilepic
router.post("/addprofilepicture", addProfilePicture);

export default router;
