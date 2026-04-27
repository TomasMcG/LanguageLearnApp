import express from "express";
//import { wordData } from "./wordData.js";
import sentence from "./sentenceModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const sentences = await sentence.find({ userId });
    console.log("Sentecnes FROM DB:", sentences);
    res.status(200).json(sentences);
  } catch (err) {
    console.error("Error fetching topics:", err);
    res.status(500).json([]);
  }
});

router.post("/", async (req, res) => {
  try {
    const { sentences, userId } = req.body;

    const saved = await sentence.insertMany(
      sentences.map((s) => ({
        sentenceText: s.sentence,
        englishTranslation: s.translation,
        userId,
        wordIds: [],
      }))
    );
        res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving sentences:", err);
    res.status(500).json({ error: "Failed to save sentences" });
  }});

export default router;
