import express from "express";
//import { wordData } from "./wordData.js";
import UserWord from "./userWordModel.js";

const router = express.Router();

router.get("/:uid", async (req, res) => {
  try {
    const userWords = await UserWord.find({ userId: req.params.uid }).populate(
      "wordId",
    );
    console.log("Users WORDS FROM DB:", userWords);

    res.status(200).json(userWords);
  } catch (err) {
    res.status(500).json([]);
  }
});

export default router;
