import express from "express";
//import { wordData } from "./wordData.js";
import userWords from "./userWordModel.js";

const router = express.Router();

router.get("/:uid", async (req, res) => {
  try {
    console.log( req.params.uid);
    const gottenUsersWords = await userWords.find()
    console.log("Users WORDS FROM DB:", gottenUsersWords);

    res.status(200).json(gottenUsersWords);
  } catch (err) {
    res.status(500).json([]);
  }
});

export default router;
