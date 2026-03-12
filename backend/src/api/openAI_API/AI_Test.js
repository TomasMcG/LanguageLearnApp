import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const systemMessage = `
You are a language teacher.
Generate English and German sentences only using the words provided.
Adhere to provided grammer rules for sentence complexity.
You can add basic words to fill out the sentences if unable to form with just the words given.
Return JSON: sentence, translation.
`;

const grammerRules = ["PastTense,PresentTense","VerbEndings"]
const knownWords = ["apfel","Banane","Rot","Haus"]
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