// controller for enchancing a resumes professional summery
// POST : api/ai/enchance-pro-summery

import openai from "../configs/ai.js";
import Resume from "../models/Resume.js";

export const enhanceProfessionalSummery = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent || userContent.trim().length === 0) {
      return res.status(400).json({ message: "missing required field ..!" });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            // "You are an expert resume writer.Your task is to enhance the professional summery of a resume. Rewrite the given professional summary to be concise, formal, ATS-optimized, and impactful. Do not add fake information or skills. Keep it within 3–4 sentences also highlighting key skills, experience, and career objectives."
            "You are an expert resume writer. Your task is to enhance the professional summary of a resume. Rewrite the given content to be concise, formal, ATS-optimized, and impactful. Do not add fake skills, experiences, years, certifications, or company names. Keep the summary between 3–4 sentences. Highlight the user’s key skills, experience level, industry domain (only if already mentioned), and career objectives. Maintain a confident tone suitable for modern resumes",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });
    const enchancedContent = response.choices[0].message.content;

    return res.status(200).json({ enchancedContent });
    // console.log(response.choices[0].message);
  } catch (error) {}
  return res.status(400).json({ message: error.message });
};

// controller for enchancing a resumes job description
// POST : api/ai/enchance-job-desc
export const enhanceJobDiscription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent || userContent.trim().length === 0) {
      return res.status(400).json({ message: "missing required field ..!" });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "Rewrite the user-provided experience or job role details into a clean, ATS-friendly job description. Use bullet points (4–6 bullets). Start each point with strong action verbs (e.g., Developed, Led, Built, Implemented). Keep sentences short, measurable if possible, and relevant to the user's input. Do NOT invent responsibilities or tools — only rewrite what was given.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });
    const enchancedContent = response.choices[0].message.content;

    return res.status(200).json({ enchancedContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for uploading a resume to the database
// post /api/ai/upload-resume
// export const uploadResume = async (req, res) => {
//   try {
//     const { resumeText, title } = req.body;
//     const userId = req.userId;
//     // console.log(resumeText, title);

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     if (!resumeText || !title) {
//       return res
//         .status(400)
//         .json({ message: "resumeText and title are required" });
//     }

//     const systemPrompt =
//       "You are an expert AI Agent to extract data from resume.";

//     const userPrompt = `extract data from this resume: ${resumeText}`;

//     const response = await openai.chat.completions.create({
//       model: process.env.OPENAI_MODEL,
//       messages: [
//         {
//           role: "system",
//           content: systemPrompt,
//         },
//         {
//           role: "user",
//           content: userPrompt,
//         },
//       ],
//       response_format: {
//         type: "json_object",
//       },
//     });
//     const extractedData = response.choices[0].message.content;
//     const parsedData = JSON.parse(extractedData);

//     const newResume = await Resume.create({ userId, title, ...parsedData });

//     return res.json({ resumeId: newResume._id });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    // if (!resumeText || resumeText.trim().length === 0) {
    //   return res.status(400).json({
    //     message: "Resume text extraction failed or PDF is empty",
    //   });
    // }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!resumeText || !title) {
      return res
        .status(400)
        .json({ message: "resumeText and title are required" });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: "You are an expert AI Agent to extract data from resume.",
        },
        {
          role: "user",
          content: `extract data from this resume: ${resumeText}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    let parsedData;
    try {
      parsedData = JSON.parse(response.choices[0].message.content);
    } catch {
      return res.status(500).json({ message: "AI response parsing failed" });
    }

    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });

    return res.status(201).json({ resumeId: newResume._id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
