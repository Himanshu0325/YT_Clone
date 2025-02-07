import { Router } from "express";
import { createvideo, deleteVideo , findVideo, getAllVideos, updateViews } from "../Controllers/video.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";
import { verifyJWT } from "../Middlewares/Auth.middleware.js";

const router = Router();

router.route("/create-video").post( upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "videoFile", maxCount: 1 }
]),verifyJWT, createvideo);

router.route('/delete-video').post(deleteVideo)

router.route('/get-all-videos').get(getAllVideos)

router.route('/get-video').post(findVideo)

router.route('/update-views').post(updateViews)



export default router;