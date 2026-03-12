import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const response = await client.responses.create({
    model: "gpt-5-mini",
    input: `Generate 5 beginner german sentences with the  words apple,red,student,house,family`
    
});

console.log(response.output_text);