// configs/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    const projectName = "resume-builder";

    if (!MONGODB_URI) {
      throw new Error("❌ MONGODB_URI missing from .env");
    }

    const DB_URL = MONGODB_URI.endsWith('/')
      ? `${MONGODB_URI}${projectName}`
      : `${MONGODB_URI}/${projectName}`;

    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB Connected Successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log("❌ MongoDB Error:", err);
    });

    // IMPORTANT: must include dbName for SRV pointer cluster
    await mongoose.connect(DB_URL, {
      dbName: projectName,
    });
  } catch (error) {
    console.error("🔥 MongoDB Connection FAILED:", error.message);
    process.exit(1);
  }
};

export default connectDB;
