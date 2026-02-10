import jwt from "jsonwebtoken";
import User from "../models/User.js";

// const protect = async (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized..! Token missing " });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // console.log(decoded);

//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized..! Invalid token" });
//   }
// };

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // No Authorization header or wrong format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Extract token
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ FIX HERE
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default protect;
