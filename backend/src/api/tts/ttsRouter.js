import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import express from "express";
import pkg from "wavefile";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Buffer } from "buffer";
dotenv.config();
const { WaveFile } = pkg;

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const router = express.Router();

router.post("/speak", async (req, res) => {
  try {
     
  

    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "text is required" });
    }

const prompt =
  "Here's the dialogue script: \n" +
  text +
  " Now generate the audio for this text.";

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Aoede" },
          },
        },
      },
    });

    const audioData =
      response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    const pcm = Buffer.from(audioData, "base64");
    const int16 = new Int16Array(pcm.buffer, pcm.byteOffset, pcm.byteLength / 2);
    const wav = new WaveFile();
    wav.fromScratch(1, 24000, "16", int16);

    const audioDir = path.join("public", "audio");
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    const fileName = `${uuidv4()}.wav`;
    const filePath = path.join(audioDir, fileName);
    fs.writeFileSync(filePath, wav.toBuffer());

    res.json({ audioUrl: `http://localhost:3000/audio/${fileName}` });
  } catch (err) {
    console.error("Error generating speech:", err);
    res.status(500).json({ error: "Failed to generate speech" });
  }
});

export default router;