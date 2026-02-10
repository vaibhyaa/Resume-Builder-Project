import express from "express";
import {
  getUserDataById,
  getUserResumes,
  loginUser,
  registerUser,
} from "../controllers/UserController.js";
import protect from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/data", protect, getUserDataById);

userRouter.get("/resumes", protect, getUserResumes);

export default userRouter;




// userRouter.post("/register", registerUser);
// userRouter.post("/login", loginUser);

// // protected
// userRouter.use(protect);
// userRouter.get("/data", getUserDataById);
// userRouter.get("/resumes", getUserResumes);
