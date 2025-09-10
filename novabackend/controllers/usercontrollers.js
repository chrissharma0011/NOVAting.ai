import asyncHandler from "express-async-handler";
import { User } from "../models/usermodel.js";
import { ApiError } from "../utils/apierror.js";
import {ApiResponse } from "../utils/apiresponse.js"; // make sure this exists

// Generate access + refresh tokens
const generateAccessTokenAndRefreshTokens = async (userId) => {
  try {
    console.log("working -1");
    const user = await User.findById(userId);
    console.log("intermediate")
    const accessToken =await user.generateAccessToken();
    const refreshToken =await user.generateRefreshToken();
    console.log("working -2");
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(400, "Unable to generate tokens");
  }
};

// Register new user
const registerUser = asyncHandler(async (req, res) => {
  const { firstName,lastName,email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({ email, password ,firstName,lastName});
  if (!user) {
    throw new ApiError(400, "Failed to create a new user");
  }

  // Generate tokens
  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshTokens(user._id);

  const finalUser = await User.findById(user._id).select("-password -refreshToken");

  // Cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(201, { user: finalUser, refreshToken, accessToken }, "User registered successfully")
    );
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) throw new ApiError(400, "Email is required");
  if (!password) throw new ApiError(400, "Password is required");
    console.log("working -1 login");
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "No user found with this email");

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) throw new ApiError(401, "Incorrect password");
    console.log("working -2 login");
  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshTokens(user._id);
  const finalUser = await User.findById(user._id).select("-password -refreshToken");

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  console.log("working -3 login");
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(200, { user: finalUser, refreshToken, accessToken }, "User logged in successfully")
    );
});

export { registerUser, loginUser };
export { generateAccessTokenAndRefreshTokens }; // export to use elsewhere if needed
