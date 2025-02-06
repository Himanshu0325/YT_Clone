import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { Video } from "../Models/video.model.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const createvideo = asyncHandler(async (req, res) => {
  const { title, discription } = req.body;
  const thumbnailPath = req.files?.thumbnail[0]?.path;
  const videoFilePath = req.files?.videoFile[0]?.path || '';

  if (!title || !discription || !thumbnailPath || !videoFilePath) {
    return res
      .send({
        message: "All Feild are required"
      })
  }
  
  const thumbnail = await uploadOnCloudinary(thumbnailPath);
  const videoFile = await uploadOnCloudinary(videoFilePath);

  const video = await Video.create({
    title,
    discription,
    thumbnail: thumbnail.url,
    videoFile: videoFile.url,
    owner: req.user._id,
    duration: videoFile.duration,
  });

  if (!video) {
    return res
      .send({
        message: "Video not uploaded"
      })
  }

  return res
  .send({
    message:"Video Has Been uploaded successfully"
  })
  
});

const deleteVideo = async (req ,res)=>{
  const {videoId } = req.body

  if (!videoId) {
    return res
    .status(400)
  }

  await Video.findByIdAndDelete(videoId)
  .then(deletedUser => {
    if (deletedUser) {
      console.log('User deleted successfully:');
    } else {
      console.log('User not found');
    }
  })
  .catch(error => {
    console.error('Error deleting user:', error);
  });

}

const getAllVideos = async (req ,res)=>{

  const videos = await Video.aggregate([
    {
    $lookup: {
      from: 'users',
      localField: 'owner',
      foreignField: '_id',
      as: 'user'
    }
    }, 
    {
      $project: {
        title: 1,
        discription: 1,
        thumbnail: 1,
        videoFile: 1,
        views: 1,
        'user.username': 1,
        'user.avatar': 1,
        'user.channelName': 1,
      }
    }
  
  ])

  // const videos = await Video.find({}).populate('owner')
  if (!videos) {
    return res
    .status(400)
    .send({
      message: "No videos found"
    })
  }
  return res
  .send({
    videos
  })
  .status(200)
}


export { createvideo , deleteVideo , getAllVideos };