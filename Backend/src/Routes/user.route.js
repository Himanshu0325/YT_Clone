import { Router } from "express";
import { app } from "../app.js";
import { registerUser } from "../Controllers/user.controller.js";
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

// app.post('/register',upload.fields(
//   [
//     {
//       name: "avatar",
//       maxCount:1
//     },
//     {
//       name:"coverImage",
//       maxCount:1
//     }
//   ]
// ) ,
//  registerUser
// )

export  default router