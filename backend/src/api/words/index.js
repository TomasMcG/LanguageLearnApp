import express from "express";
//import { wordData } from "./wordData.js";
import Word from "./wordModel.js";

const router = express.Router();
/*
router.get('/', (req, res) => {
  res.json(wordData);
});*/

router.get("/", async (req, res) => {
  try {
    const words = await Word.find();
    console.log("WORDS FROM DB:", words);
    res.status(200).json(words);
  } catch (err) {
    res.status(500).json([]);
  }
});

export default router;
