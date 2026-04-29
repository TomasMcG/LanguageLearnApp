import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


const router = express.Router();

router.post("/generateSentences", async (req, res) => {
  try {
    const { knownWords } = req.body;
    if (!knownWords || knownWords.length === 0) {
      return res.status(400).json({ error: "knownWords are required" });
    }

    


    
const systemMessage = `
You are a language teacher.
Generate English and German sentences only using the words provided.
Adhere to provided grammer rules for sentence complexity.
You can add basic words to fill out the sentences if unable to form with just the words given.
Return JSON array with fields: sentence (German), translation (English)
`;

const grammerRules = ["PastTense,PresentTense","VerbEndings"]
//const knownWords = ["apfel","Banane","Rot","Haus"]
const userMessage = `
Generate 5 Spanish sentences using only these words: ${knownWords} and grammer rules: ${grammerRules}
`;

const response = await client.responses.create({
  model: "gpt-5-mini",
  input: [
    { role: "system", content: systemMessage },
    { role: "user", content: userMessage }
  ]
});

    console.log(response.output_text);
    res.status(200).json({ sentences: response.output_text });
  } catch (err) {
    console.error("Error generating sentences:", err);
    res.status(500).json({ error: "Failed to generate sentences" });
  }
});

export default router;
