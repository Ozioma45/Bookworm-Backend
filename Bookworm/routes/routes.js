import express from "express";
import Auth from "../middleware/Auth.js";

//controller function
import {
  signupUser,
  loginUser,
  addProfilePicture,
} from "../controllers/user.controller.js";

import {
  saveBookshelf,
  getBookshelfByUser,
  deleteBookshelf,
} from "../controllers/bookshelf.controller.js";

const router = express.Router();

//login route
router.post("/user/login", loginUser);

//signup route
router.post("/user/signup", signupUser);

//profilepic
router.post("/addprofilepicture", addProfilePicture);

//require auth for all bookshelf route
router.use(Auth);

// Bookshelf routes
router.post("/saveBookshelf", saveBookshelf);
router.get("/getBookshelfByUser", getBookshelfByUser);
router.delete("/deleteBookshelf/:id", deleteBookshelf);

export default router;
