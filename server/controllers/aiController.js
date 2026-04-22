import ai from "../config/ai.js";
import Resume from "../models/Resume.js";

//controller for enhancing a resume
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. the summary should be 1-2 sentences also highlighting key skills,experience and career objectives. Make it compelling and ATS-friendly. And only return text no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhanceContent = response.choices[0].message.content;
    return res.status(200).json({ enhanceContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//controller of job description
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only in 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhanceContent = response.choices[0].message.content;
    return res.status(200).json({ enhanceContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//controller for uploading a resume to database
export const uploadResume = async (req, res) => {
  console.log("AI CONTROLLER HIT");

  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt =
      "You are an expert AI Agent to extract data from resume.";

    const userPrompt = `extract data from this resume:${resumeText}
    Provide data in the following JSON format with No additional text before or after:
    
    {
      professional_summary: "",
      skills: [],
      personal_info: {
        image: "",
        full_name: "",
        profession: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: ""
      },
      experience: [
        {
          company: "",
          position: "",
          start_date: "",
          end_date: "",
          description: "",
          is_current: false
        }
      ],
      project: [
        {
          name: "",
          type: "",
          description: ""
        }
      ],
      education: [
        {
          institution: "",
          degree: "",
          field: "",
          graduation_date: "",
          gps: ""
        }
      ]
    }`;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const extractedData = response.choices[0].message.content;

    let parsedData;
    try {
      parsedData = JSON.parse(extractedData);
    } catch {
      const match = extractedData.match(/\{[\s\S]*\}/);
      if (!match) {
        return res
          .status(400)
          .json({ message: "AI response is not valid JSON" });
      }
      parsedData = JSON.parse(match[0]);
    }

    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });

    return res.json({ resumeId: newResume._id });
  } catch (error) {
  console.log("AI ERROR 👉", error); 
  return res.status(400).json({ message: error.message });
}

};

