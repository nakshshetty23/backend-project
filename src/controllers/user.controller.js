import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req,res) => {
    res.status(200).json({
        mwssage: "ok"
    })
    const {fullname, email, username, password} = req.body
    console.log("email:", email);

   /* if (fullname === "") {
        throw new ApiError(400, "fullname is required")
    } */

      if (
        [fullname, email, password,username].some((field) => field?.trim === "")
      )
      {
         throw new ApiError(400, "fullname is required")
      }
      const existedUser = User.findOne({
        $or: [{ username }, { email }]
      })

      if(existedUser) {
        throw new ApiError(409, "user with username or email already exists")
      }

      const avatarLocalPath = req.file?.avatar[0]?.path;
      const coverImageLocalPath = req.file?.coverImage[0]?.path;

      if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar is requried!");
      }

      const avatar = await uploadOnCloudinary(avatarLocalPath);
      const coverImage = await uploadOnCloudinary(coverImageLocalPath);

      if(!avatar) {
        throw new ApiError(400, "avatar is requried!")
      }

      const user = await User.create ({
        fullname,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
      })
      const createdUser = await User.findByID(user._id).select(
        "-password -refreshToken"
      )

      if(!createdUser) {
        throw new ApiError(500, "Something went Wrong while registering the user")
      }

      return res.status(201).json(
        new ApiResponse(200, createdUser, "User registerded Sucessful ")
      )
})


export {registerUser}