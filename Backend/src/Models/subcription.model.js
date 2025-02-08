import mongoose , {Schema} from "mongoose";

const SubscriptionSchema = new Schema({
  subscriber :{
    type : Schema.Types.ObjectId, //one who is subcribing
    ref: "User"
  },
  channel:{
    type: Schema.Types.ObjectId, //to whom subcriber is subscribing
    ref: "User"
  }
},{timestamps : true});

export const Subscription = mongoose.model('Subscription', SubscriptionSchema);

