import ai from "./server/config/ai.js";
import dotenv from "dotenv";
dotenv.config({ path: "./server/.env" });

async function test() {
  try {
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [{ role: "user", content: "Hello" }],
    });
    console.log("Success:", response.choices[0].message.content);
  } catch (error) {
    console.log("AI ERROR MESSAGE:", error.message);
    if (error.response) {
      console.log("AI ERROR DATA:", error.response.data);
    }
  }
}

test();
