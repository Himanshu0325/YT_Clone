import mongoose , {Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
  {
    username :{
      type: String,
      required : true,
      unique : true,
      trim: true,
      index: true,
    },
    email :{
      type: String,
      required : true,
      unique : true,
      trim: true,
    },
    fullname :{
      type: String,
      required : true,
      trim: true,
      index: true,
    },
    avatar :{
      type: String,
      required : true,
    },
    coverImage :{
      type: String,
    },
    isChannel :{
      type:Boolean,
      required:true
    },
    channelName: {
      type : String,
    },
    channelDescription:{
      type:String
    },
    watchHistory:[
      {
        type : Schema.Types.ObjectId,
        ref: "Video"
      }
    ],
    password:{
      type: String,
      required:[true,'password is required']
    },
    refreshToken:{
      type:String
    },
  },
  {
    timestamps:true,
  }
)

userSchema.pre("save", async function (next)  {

  if( !this.isModified("password")) {
    return next()
  } else{
    this.password = await bcrypt.hash(this.password,10)
  }
  next()
})

userSchema.methods.isPasswordCorrect = async function (password){
  console.log(await bcrypt.compare(password , this.password),"bycrpt value");
  
  return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = async function(){
  return jwt.sign(
    { 
      _id : this._id,
      username : this.username,
      fullname : this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
    }
  )
}
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    { 
      _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

export const User = mongoose.model("User",userSchema) 