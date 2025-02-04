import { Router } from "express";
import { registerUser, verifyUser,logoutUser, getUserProfile , changeCurrentPassword ,updateAccountDetails, getUserVideo, getUser} from "../Controllers/user.controller.js";
import { verifyJWT } from "../Middlewares/Auth.middleware.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(verifyUser);

router.route("/logout").post(verifyJWT,  logoutUser)

router.route("/profile").post(verifyJWT , getUserProfile)

router.route("/change-password").post(verifyJWT,  changeCurrentPassword)
router.route("/update-info").post(verifyJWT,  updateAccountDetails)

router.route("/uservideos").post(verifyJWT,  getUserVideo)

router.route("/search-channel").post(getUser)

export default router;