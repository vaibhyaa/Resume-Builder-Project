// controller for creating a new resume
// POST /API/RESUME/CREATE

import { json } from "express";
import { registerUser } from "./UserController.js";
import fs from "fs";
// import Resume from "../models/resume.model.js";


import mongoose from "mongoose";
import Resume from "../models/Resume.js";
import imageKit from "../configs/imageKit.js";

// controller for creating a new resume
// POST : /api/resumes/create
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;
    // console.log("user id ", userId);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    // create new resume
    const newResume = await Resume.create({
      userId,
      title,
    });
    // return success message
    // resume is object key and newResume is the variable holding the created resume from MongoDB
    return res
      .status(201)
      .json({ message: "Resume created successfuly", resume: newResume });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// controller for deleting resume
// Delete : /api/resumes/delete
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const deleted = await Resume.findOneAndDelete({ userId, _id: resumeId });

    if (!deleted) {
      return res.status(404).json({ message: "Resume not found" });
    }
    // return success message
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get users resume by id
// get : /api/resumes/get
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ userId, _id: resumeId });
    // if resume doesnot exist
    if (!resume) {
      return res.status(404).json({ message: "Resume not found ..!" });
    }
    // toObject() === convert Mongoose record → normal JSON object so you can clean it before sending to frontend.
    const cleanResume = resume.toObject();
    delete cleanResume.__v;
    delete cleanResume.createdAt;
    delete cleanResume.updatedAt;

    return res.status(200).json({ resume: cleanResume });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get resume by id public
// get /api/resumes/public
export const getPublicResumeByid = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found ..!" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const updateResume = async (req, res) => {
  try {
    // we need resumeId also and userId also
    const userId = req.userId;
    // this will be available from middleware
    const { resumeId, resumeData, removeBackground } = req.body;
    let resumeDataCopy = {};
    try {
      resumeDataCopy = JSON.parse(resumeData);
    } catch {
      return res.status(400).json({ message: "Invalid resume JSON data" });
    }
    // Cleanup – prevent overriding protected DB fields
    delete resumeDataCopy._id;
    delete resumeDataCopy.userId;
    delete resumeDataCopy.createdAt;
    delete resumeDataCopy.updatedAt;
    delete resumeDataCopy.__v;

    // middleware will handle this image upload
    const image = req.file;

    if (image) {
      const uploadResult = await imageKit.upload({
        file: image.buffer, // 👈 IMPORTANT — use buffer
        fileName: `${resumeId}-profile.png`,
        folder: "user-resumes",
        // transformation: {
        //   pre:
        //     `w-300,h-300,fo-face,z-0.75` +
        //     (removeBackground ? `,e-bgremove` : ""),
        // },
        transformation: {
          pre: `w-300,h-300,fo-face,z-0.75${
            removeBackground ? ",e-bgremove" : ""
          }`,
        },
      });

      resumeDataCopy.profileImage = uploadResult.url;
    }

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId }, // Ensure only owner can update
      { $set: resumeDataCopy }, // Use $set to avoid replacing full document
      { new: true, runValidators: true }
    );

    if (!updatedResume) {
      return res
        .status(404)
        .json({ message: "Resume not found or unauthorized" });
    }

    return res
      .status(200)
      .json({ message: "Resume updated successfully ", resume: updatedResume });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
