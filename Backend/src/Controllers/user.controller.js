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
  const{ accessToken }= req.body;
    if (!accessToken) {
      return res.json({
        status: 401,
        message: "Unauthorized request",
        code:420,
      });
    }
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    if (!user) {
      return res.json({
        status: 401,
        message: "invalid access token ! User not Found"
      });
    }

    return res.send({
      avatar: user.avatar,
      fullname: user.fullname,
      username: user.username,
      

  });
});

const changeCurrentPassword = asyncHandler(async (req , res)=>{
  const {oldPassword , newPassword} = req.body
  console.log(oldPassword , newPassword);
  
  const user  = await User.findById(req.user?._id)
  const isPasswordCorrect = user.isPasswordCorrect(oldPassword)

  if (!isPasswordCorrect) {
    console.log('password is incorrect');
    
    return res
    .status(400)
    .send({
      message : "Incorrect old Password",
      code:400,
    })
  }

  user.password = newPassword
  await user.save({validateBeforeSave:false})

  return res
    .status(200)
    .send({
      message : "Password updated successfully",
      code:200,
    })
})

const updateAccountDetails = async (req , res)=>{
  const {email , fullname} = req.body

  if (!fullname || !email) {
    return res
    .status(400)
    .send({
      message : "All Feilds are required",
      code:400,
    })
  }

  const user = User.findByIdAndUpdate(
    req.user._id,
    {
      $set:{
        fullname,
        email:email
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
    })
}

export {
  registerUser,
  verifyUser,
  logoutUser,
  getUserProfile,
  changeCurrentPassword,
  updateAccountDetails,
};