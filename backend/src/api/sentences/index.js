import express from "express";
//import { wordData } from "./wordData.js";
import sentence from "./sentenceModel";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sentences = await sentence.find();
    console.log("Sentecnes FROM DB:", sentences);
    res.status(200).json(sentences);
  } catch (err) {
    console.error("Error fetching topics:", err);
    res.status(500).json([]);
  }
});



export default router;
