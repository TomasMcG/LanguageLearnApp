import express from "express";
import Topic from "./topicModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const topics = await Topic.find();
    console.log("TOPICS FROM DB:", topics);
    res.status(200).json(topics);
  } catch (err) {
    console.error("Error fetching topics:", err);
    res.status(500).json([]);
  }
});

export default router;
