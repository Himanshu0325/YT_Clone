import { asyncHandler } from "../Utils/asyncHandler.js";
import {ApiError} from "../Utils/ApiError.js"
import {User} from "../Models/user.model.js"
// import { user } from "../Models/user.model.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";
import { ApiResponse } from "../Utils/ApiResponse.js";


const generateAccessAndRefereshTokens = async(userId) =>{
  try {
      const user = await User.findById(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()

      user.refreshToken = refreshToken
      await user.save({ validateBeforeSave: false })

      return {accessToken, refreshToken}


  } catch (error) {
      throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}

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
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

  if(!avatarLocalPath){
    throw new ApiError(400,'Avatar file is required'); 
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)


  if(!avatar){
    throw new ApiError(400,'Avatar file is required')
  }

  const user = await User.create({
    fullname:fullName,
    username:userName,
    email:email,
    password:password,
    avatar:avatar.url,
    coverImage:coverImage.url || ""
  })

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!userCreated){
    throw new ApiError(500,"Something went wrong ! user was not created")
  }

  return res.status(201).json(
    new ApiResponse (200, userCreated ,"user registered successfully")
    
  ),
  console.log("user created succesfully");
  

})

const verifyUser = asyncHandler(async (req , res )=>{

  //fetch data from req body 
  const {password , email  } = req.body

  //username or email
  if (!email) {
    throw new ApiError(400,"Email is required")
  }

  //find the user
  const user = await User.findOne({email})

  if (!user) {
    throw new ApiError(400,"User Not found")
  }

  //password check 
  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(400,"incorrect Password")
  }


  //access and refresh tokens
  const {accessToken , refreshToken} = await generateAccessAndRefereshTokens(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  //send cookie
  const options = {
    httpOnly : true,
    secure : true,
  }
   return res
   .status(200)
   .cookie("accessToken", accessToken,options)
   .cookie("refreshToken", refreshToken,options)
   .json(
    new ApiResponse(200,
      {
        user: loggedInUser, accessToken, refreshToken
      },
      "User logged in Successfully"
    )
   )

})


const logoutUser = asyncHandler(async (req , res)=>{
})

//  const registerUser = async (req,res)=>{
//   res.status(200).json({
//         message : 'ok'
//        })
//  }




export { registerUser}