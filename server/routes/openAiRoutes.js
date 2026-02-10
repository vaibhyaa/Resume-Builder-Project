import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  enhanceProfessionalSummery,
  enhanceJobDiscription,
  uploadResume,
} from "../controllers/openAiController.js";
import upload from "../configs/multer.js";

const openAiRouter = express.Router();

openAiRouter.post("/enchance-pro-summery", protect, enhanceProfessionalSummery);

openAiRouter.post("/enchance-job-desc", protect, enhanceJobDiscription);

openAiRouter.post(
  "/upload-resume",
  protect,
  upload.single("resume"),
  uploadResume
);

export default openAiRouter;
