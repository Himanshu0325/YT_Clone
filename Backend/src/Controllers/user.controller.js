import { asyncHandler } from "../Utils/asyncHandler.js";
import {ApiError} from "../Utils/ApiError.js"
import {User} from "../Models/user.model.js"
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const registerUser = asyncHandler( async (req , res ) => {
  
  //get user details from frontend
  const {fullName , email , userName , password ,} = req.body
  console.log('details : ',fullName,email,userName,req.body)

  //Validation
  if([fullName,email,userName,password].some((feild)=>{
    feild?.trim() === ""}
  ))
  {
    throw new ApiError(400, 'All fields are required')
  }

  //check if the user allready exist
  const existedUser = await User.findOne({
    $or : [{userName},{email}]
  })
  if(existedUser){
    throw new ApiError(409,'User allready exist')
  }

  // console.log(req.files.avatar[0].path)
  const avatarLocalPath = req.files?.avatar[0]?.path ;
    //  const avatarLocalPath = "../Public/perm"
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError(400,'Avatar file is required'); 
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar){
    throw new ApiError(400,'Avatar file is required')
  }

  const user = await User.create({
    fullName,
    userName:userName.toLowercase(),
    email,
    password,
    avatar:avatar.url,
    coverImage:coverImage?.url || ""
  })

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!userCreated){
    throw new ApiError(500,"Something went wrong ! user was not created")
  }

  return res.status(201).json(
    new ApiResponse (200, userCreated ,"user registered successfully")
  )

})

//  const registerUser = async (req,res)=>{
//   res.status(200).json({
//         message : 'ok'
//        })
//  }




export { registerUser}