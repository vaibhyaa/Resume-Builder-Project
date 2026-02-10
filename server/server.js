import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/UserRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import openAiRouter from "./routes/openAiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// database connection
await connectDB();

// middlewares
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => res.send("server is live ...!"));

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", openAiRouter);

// start server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
