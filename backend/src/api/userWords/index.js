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


router.patch("/:userId/:wordId", asyncHandler(async (req, res) => {
  const { userId, wordId } = req.params;
  const { correct } = req.body; // true or false, did you remember the word or not

  const userWord = await userWords.findOne({ userId, wordId });
  if (!userWord) return res.status(404).json({ message: "UserWord not found" });

  //used to set if wrong to 0, or double the interval for time to next review otherwise. this is used to determine the next review date
  let interval;
  if (!correct) {
    interval = 0; 
  } else {
    interval = userWord.timeToNextReview <= 0
      ? 1
      : userWord.timeToNextReview * 2;
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  const updated = await userWords.findOneAndUpdate(
    { userId, wordId },
    {
      timeToNextReview: interval,
      nextReviewDate,
      lastReviewed: new Date(),
    },
    { new: true }
  );

  res.status(200).json(updated);
}));

export default router;
