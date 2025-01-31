import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { Video } from "../Models/video.model.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const createvideo = asyncHandler(async (req, res) => {
  const { title, discription } = req.body;
  const thumbnailPath = req.files?.thumbnail[0]?.path;
  const videoFilePath = req.files?.videoFile[0]?.path;

  if (!title || !discription || !thumbnailPath || !videoFilePath) {
    throw new ApiError(400, "All fields are required");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailPath);
  const videoFile = await uploadOnCloudinary(videoFilePath);

  const video = await Video.create({
    title,
    discription,
    thumbnail: thumbnail.url,
    videoFile: videoFile.url,
    owner: req.user._id
  });

  return res.status(201).json(new ApiResponse(201, video, "Video uploaded successfully"));
});

export { createvideo };