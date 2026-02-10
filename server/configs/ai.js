import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

export default openai;

// const response = await openai.chat.completions.create({
//     model: "gemini-2.5-flash",
//     messages: [
//         {   role: "system",
//             content: "You are a helpful assistant."
//         },
//         {
//             role: "user",
//             content: "Explain to me how AI works",
//         },
//     ],
// });

// console.log(response.choices[0].message);
