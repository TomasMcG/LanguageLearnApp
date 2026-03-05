import express from "express";
//import { wordData } from "./wordData.js";
import asyncHandler from "express-async-handler";
import userWords from "./userWordModel.js";

const router = express.Router();

router.get("/:uid", async (req, res) => {
  try {
    console.log(req.params.uid);
    const gottenUsersWords = await userWords.find({ userId: req.params.uid });
    console.log("Users WORDS FROM DB:", gottenUsersWords);

    res.status(200).json(gottenUsersWords);
  } catch (err) {
    res.status(500).json([]);
  }
});

router.post(
  "/",

  asyncHandler(async (req, res) => {
    const { wordId, userId } = req.body;
    console.log("Running Post user words");
    console.log("Users WORDS id FROM DB:", wordId);
    console.log("Users WORDS user FROM DB:", userId);

    if (!wordId || !userId) {
      return res
        .status(400)
        .json({ message: "wordId and userId are required" });
    }

    const newUserWord = new userWords({
      wordId,
      userId,
      proficiencyLevel: 0,
      lastReviewed: new Date(),
      timeToNextReview: 0,
      nextReviewDate: new Date(),
      isKnown: true,
    });
    console.log("New User Word:", newUserWord);

    const savedUserWord = await newUserWord.save();
    res.status(201).json(savedUserWord);
    console.log(savedUserWord._id);
  }),
);

export default router;
