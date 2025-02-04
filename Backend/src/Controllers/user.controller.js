import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { User } from "../Models/user.model.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken().then((res)=> {return res });
    const refreshToken = await user.generateRefreshToken().then((res)=> {return res });
    

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating referesh and access token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, userName, password } = req.body;
  console.log('details : ', fullName, email, userName, req.body);

  if ([fullName, email, userName, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, 'All fields are required');
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, 'User already exists');
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, 'Avatar file is required');
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, 'Avatar file is required');
  }

  const user = await User.create({
    fullname: fullName,
    username: userName,
    email: email,
    password: password,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
  });

  const userCreated = await User.findById(user._id).select("-password -refreshToken");

  if (!userCreated) {
    throw new ApiError(500, "Something went wrong! User was not created");
  }

  return res.status(201).json(
    new ApiResponse(200, userCreated, "User registered successfully")
  );
});

const verifyUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    // throw new ApiError(400, "User not found");
    return res.send({
      message : "User not found with given Email",
      code:400,
    })
    .status(400)
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    // throw new ApiError(400, "Incorrect password")
    return res.send({
      message : "Incorrect Password Entered",
      code:400,
    })
    .status(400)
    //Unauthorized request
    
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password ");

  const options = {
    httpOnly: true,
    secure: true,
    Credential:true
  };
  // return res [cookie parser wala code hai]
  //   .status(200)
  //   .cookie("accessToken", accessToken, options)
  //   .cookie("refreshToken", refreshToken, options)
  //   .json(
  //     new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"),
  //     console.log('User logged in successfully')
      
  //   );
  return res.send({
    status: 200,
    message: "User logged in successfully",
    code: 200,
    data: [accessToken, refreshToken,loggedInUser ],
  })
  
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1 // this removes the field from document
      }
    },
    {
      new: true
    }
  )

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
});

const getUserProfile = asyncHandler(async (req, res) => {
   const user = req.user
    
    return res.send({user});
});

const changeCurrentPassword = asyncHandler(async (req , res)=>{
  const {oldPassword , newPassword} = req.body
  console.log(oldPassword , newPassword ,req.user._id);
  
  const user  = await User.findById(req.user?._id)
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

  if (!isPasswordCorrect) {

    console.log('password is incorrect');

    return res
      .status(200)
      .send({
        message: "Incorrect old Password",
        code: 400,
      })
  }

  user.password = newPassword
  await user.save({validateBeforeSave:false})

  console.log("pass updated");
  
  return res
    .status(200)
    .send({
      message : "Password updated successfully",
      code:200,
    })
})

const updateAccountDetails = async (req , res)=>{
  const {email , fullname , username , password } = req.body
  console.log(email , fullname , username , password);
  
  const user  = await User.findById(req.user?._id)
  
  const isPasswordCorrect = await user.isPasswordCorrect(password)

  if (!isPasswordCorrect) {
    return res
    .status(200)
    .send({
      message : "Incorrect Password",
      code:400,
    })
  }
  else{
    await User.findByIdAndUpdate(
    req.user._id,
    {
      $set:{
        fullname:fullname?fullname:user.fullname,
        email:email?email:user.email ,
        username : username?username:user.username
      }
    },
    {
      new:true
    }
  ).select("-password")

  return res
    .status(200)
    .send({
      message : "Account details updated Successfully",
      code:200,
    })}
}

const getUserChannelProfile = async(req,res) =>{
  const {username} = req.params

  if (!username?.trim()) {
    return res.send({
      message:"Username is Invalid"
    })
    .status(400)
  }

  const Channel = await User.aggregate(
    {
      $match: {
        username: username?.toLowerCase()
      }
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignFiled:"channel",
        as : "subscribers"
      }
    },
    {
      $lookup:{
        from: "subscriptions",
        localField: "_id",
        foreignFiled:"subscriber",
        as : "subscribedToo"
      }
    },
    {
      $addFields:{

          subscribersCount:{
          $size: "$subscribers"
          },
          channelssubscribedToo:{
            $size : "$subscribedToo"
          },
          isSubscribed: {
            $cond: {
              if: {$in : [req.user?._id , "$subscribers.subscriber"]},
              then: true,
              else: false,
            }
          }
      }
    },
    {
      $project: {
        fullName:1,
        username:1,
        subscribersCount:1,
        channelssubscribedToo:1,
        isSubscribed:1,
        avatar:1,
        coverImage:1,
      }
    }
  )

  if (!Channel?.length) {
    return res
    .status(400)
    .send({
      message:'channel does not exits'
    })
  }

  return  res
  .status(400)
  .json(Channel[0])
}

const getUserVideo = async (req ,res)=>{

  const id = req.user._id
  if (!id) {
    return res.send({
      message:"User Id is Invalid"
    })
    .status(200)
  }

  const allVideos = await User.aggregate(
    [{
      $match: {
        _id: id
      }
    },
    {
      $lookup : {
          from : 'videos', 
          localField : '_id', 
          foreignField : 'owner', 
          as : 'allVideos'
       }
    },
    {
      $addFields: {
        userVideo: "$allVideos"
      }
    },
    {
      $project :{
        title:1,
        discription:1,
        thumbnail:1,
        userVideo:1,
        username:1
       }
    }]
  )
  
  return res
   .status(200)
   .send(allVideos)
}

const getUser = async (req , res)=>{
  const {searchQuery} = req.body
  console.log("search:*",searchQuery,req.body);
  
  if (!searchQuery) {
    throw new ApiError(400,"search bar is empty")
  }

  try{
    const user = await User.findOne({username : searchQuery}).select("-password -refreshToken");
    console.log(user);
    if (!user) {
      
      return res
        .status(200)
        .send({
          message:'User Not found with given name'
        })
    }
    return res
      .status(200)
      .send({user})
  }catch{

  }
}

export {
  registerUser,
  verifyUser,
  logoutUser,
  getUserProfile,
  changeCurrentPassword,
  updateAccountDetails,
  getUserChannelProfile,
  getUserVideo,
  getUser
};