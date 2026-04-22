import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const ai = {
  chat: {
    completions: {
      create: async ({ model, messages }) => {
        let prompt = "";
        messages.forEach(msg => {
           prompt += `${msg.role.toUpperCase()}: ${msg.content}\n`;
        });
        
        const apiKey = process.env.OPENAI_API_KEY;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        if (!response.ok) {
           const errText = await response.text();
           throw new Error(`Gemini Error ${response.status}: ${errText}`);
        }
        const data = await response.json();
        const text = data.candidates[0]?.content?.parts[0]?.text || "";
        return { choices: [{ message: { content: text } }] };
      }
    }
  }
};

async function test() {
  try {
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [{ role: "user", content: "Say hello!" }],
    });
    console.log("Success:", JSON.stringify(response.choices[0], null, 2));
  } catch (e) {
    console.log("FAILED:", e.message);
  }
}
test();
