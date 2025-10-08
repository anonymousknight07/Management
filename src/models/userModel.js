import {mongoose, Schema} from "mongoose";
import brcypt from "bcrypt"; 
import jwt from "jsonwebtoken"
import crypto from "crypto"
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

userSchema.methods.isPasswordCorrect=async function(password){
  return await brcypt.compare(password,this.password);
}


userSchema=pre("save", async function(next){
  if(!this.isModified("password")) return next();
  this.password=await brcypt.hash(this.password,10)
  next()
})


// to generate accesstoken and refreshtoken

userSchema.methods.generateAccessToken= function(){
  return jwt.sign({
    _id: this._id, // this is payload
    email: this.email, // this is payload
    username: this.username, // this is payload
  },
  process.env.ACCESS_TOKEN_SECRET,
  {expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
}

userSchema.methods.generateRefreshToken= function (){
  return jwt.sign({
    id: this._id, 
    // email: this.email, 
    // username: this.username, // this and above id and email is payload --> we can keep this , but in refreshTOken it is not advisble to pass all the data as payload
  },
process.env.REFRESH_TOKEN_SECRET,
{expiresIn:process.env.REFRESH_TOKEN_EXPIRY});
};


userSchema.methods.generateTempTokens =function() {
  const unHashedToken=crypto.randomBytes(25).toString("hex")
  
  const hashToken= crypto
                  .createHash("sha256")
                  .update(unHashedToken)
                  .digest("hex")
  const tokenExpiry= Date.now()+(20*60*1000) // 20 minutes
  return {unHashedToken,hashToken, tokenExpiry} //returning whatever is generating
};
export const User=mongoose.model("User",userSchema);

