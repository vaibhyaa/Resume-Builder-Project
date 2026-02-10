import User from "../models/User.js";
import bcrypt from "bcrypt";
import { json } from "express";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";

const generateToken = (userId) => {
  // implementation for token generation (e.g., JWT)
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
    issuer: "resume-builder-api",
    audience: "resume-builder-client",
  });
  return token;
};

// controller for user registration
// post : /api/users/register
// http://localhost:3000/api/users/register
// expected responce
// {
//   "message": "User registered successfully",
//   "user": { "_id": "...", "name": "Alex", "email": "alex@test.com" },
//   "token": "eyJhbGciOi..."
// }
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if required fields are present
    if (!name || !password || !email) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // prepare safe user response (remove password)
    const userData = newUser.toObject();
    delete userData.password;

    // RETURN SUCCESS RESPONSE
    const token = generateToken(newUser._id);
    // newUser.password=undefined;
    return res
      .status(201)
      .json({ message: "User registered successfully", user: userData, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// controller for user login
// post : /api/users/login
// http://localhost:3000/api/users/login
// {
//   "email": "alex@test.com",
//   "password": "123456"
// }
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // prepare safe user response
    const userData = user.toObject();
    delete userData.password;

    // return success response
    // generate token
    const token = generateToken(user._id);
    // user.password=undefined;
    return res
      .status(200)
      .json({ message: "User logged in successfully", user: userData, token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};



// controoller for getting user details
// get : /api/users/data
// export const getUserDataById = async (req, res) => {
//   try {

//     console.log("USER ID FROM TOKEN:", req.userId);
//     const userId = req.userId;
//     // check if user exists
//     // const user = await User.findById(userId).select("-password");
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(400).json({ message: "User does not exist" });
//     }

//     // return user success response
//     // user.password = undefined;
//     return res
//       .status(200)
//       .json({ user, message: "User data retrieved successfully" });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };
export const getUserDataById = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "User ID missing from token" });
    }
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      user,
      message: "User data retrieved successfully",
    });
  } catch (error) {
    console.error("GET USER ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};




//controller for getting user resume
//GET /Api/users/resumes
// http://localhost:3000/api/users/resumes
export const getUserResumes = async (req, res) => {
  try {
    // userId property will be added using the product middleware
    const userId = req.userId;

    // return user resumes
    const resumes = await Resume.find({ userId });
    return res
      .status(200)
      .json({ resumes, message: "User resumes fetched successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
