import { Router } from "express";
import { registerUser, verifyUser } from "../Controllers/user.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";



const router = Router()

router.route("/register").post(
  

  upload.fields([
    {
      name: "avatar",
      maxCount:1
    },
    {
      name:"coverImage",
      maxCount:1
    }
  ]),
  registerUser
)

router.route("/login").post(verifyUser)


export  default router