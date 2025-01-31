import { Router } from "express";
import { createvideo } from "../Controllers/video.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";
import { verifyJWT } from "../Middlewares/Auth.middleware.js";

const router = Router();

router.route("/create-video").post(verifyJWT, upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "videoFile", maxCount: 1 }
]), createvideo);

export default router;