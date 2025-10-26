import {User} from "../models/userModel.js"
import { ApiResponse} from "../utils/api-response.js"
import {ApiError} from "../utils/api-error.js"
import {asyncHandler} from "../utils/async-handler.js"
import {emailVerificationContent, sendEmail} from "../utils/mail.js"

const generateAccessAndRefreshToken= async(userId)=>{
    try{
       const user= await User.findById(userId)
       const accessToken=user.generateAccessToken()();
       const refreshToken=user.generateRefreshToken();

       user.refreshToken = refreshToken
       await user.save({validateBeforeSave: false});

       return {accessToken, refreshToken}
    }catch(err){
        throw new ApiError(
            500,
            "Something went wrong while generating the access Token",
        )
    }
}
const register =asyncHandler(async(req ,res)=>{
    const {email, username, password, role}= req.body

    const existingUser= await User.findOne({
        $or: [{username},{email}] // if there is username or an email, then the user is already there , no need to register the user     
    })

    if (existingUser){
        throw new ApiError(409,"User with same email or username already exist",[])
    }

    const user=new User.create({
        username, 
        email, 
        password, 
        isEmailVerified:false
    });

    const { unHashedToken, hashToken, tokenExpiry }=user.generateTempToken();

    user.emailVerificationToken=hashToken
    user.emailVerificationExpiry=tokenExpiry


    await user.save({validateBeforeSave:false})

    await sendEmail({
        email:user?.email,
        subject:"Verify your email",
        mailgenContent: emailVerificationContent(user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`
        ),
    });
    // this is done to not send user the info, whatever is mentioned after '-' is not sent
    await User.findById(user._id).select(
      "-password -refreshToken -emailVerifiationToken -emailVerifiationExpiry",
    );
    if (!createUser){
        throw new ApiError(500," Something went wrong ")
    }

    return res. 
            status(201)
            .json(
                new ApiResponse(
                    200,
                    {user: createdUser},
                    "User registered successfully and email sent"
                )
            )
});


export{ register};