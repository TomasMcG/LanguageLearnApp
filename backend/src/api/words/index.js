import express from 'express';
import { wordData } from "./wordData.js";

const router = express.Router();

router.get('/', (req, res) => {
  res.json(wordData);
});

export default router;