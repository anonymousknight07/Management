import {mongoose, Schema} from "mongoose";
import brcypt from "bcrypt"; 

const userSchema = new Schema({
  avatar: {
    type: {
      url: String,
      localPath: String
    },
    default: {
      url: `https://placehold.co/200x200`,
      localPath:""
    },
  },
  username:{
    type: String,
    required: true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true

  },

  email:{
    type:String,
    required: true,
    unique: true,
    lowercase:true,
    trim:true
  },
  fullName:{
    type:String,
    trim:true

  },
  password:{
    type:String,
    required:[true,"Password is required"]

  },
  isEmailVerified: {
    type:Boolean,
    default:false
  },
  refreshToken:{
    type:String

  },
  forgotPasswordToken:{
    type:String
  },
  forgotPasswordExpiry:{
    type:Date
  },
  emailVerifiationToken:{
    type:String
  },
  emailVerifiationExpiry:{
    type:Date
  },
},{
    timestamps:true,
});

userSchema=pre("save", async function(next){
  if(!this.isModified("password")) return next();
  this.password=await brcypt.hash(this.password,10)
  next()
})
export const User=mongoose.model("User",userSchema);

