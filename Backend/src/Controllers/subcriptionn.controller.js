import mongoose from "mongoose";
import {Subscription} from "../Models/subcription.model.js"
import { User } from "../Models/user.model.js";

const subscribe = async(req, res) =>{
  const {id , username }= req.body

  const channel = await User.aggregate([
    {
      $match:{
        username : username
      },
    },
    {
      $project:{
         _id:1 
      }
    }
    
  ])

  
const sub = await Subscription.create(
  {
    subscriber: req.user._id,
    channel: channel[0]._id
  }
)
  
}

const isSubscribe = async (req , res)=>{
  const {username} = req.body
  console.log(username);
  if (!username) {
    return res.send({
      message:"User Id is Invalid"
    })
    .status(200)
  }

  

  const channel = await User.aggregate([
    {
      $match:{
        username : username
      },
    },
    {
      $project:{
         _id:1 
      }
    }
  ])
  const ownerId = channel[0]._id
  console.log(channel[0]);
  

  // const sub = await Subscription.aggregate([
  //   {
  //     $match:{
  //       subscriber : new mongoose.Types.ObjectId(req.user._id),
  //       pipeline:[{
  //         $match:{
  //           channel : new mongoose.Types.ObjectId(ownerId)
  //         }
  //       }]
  //     }

  //   }
  // ])
  // console.log(sub);
  
}

export {subscribe , isSubscribe}