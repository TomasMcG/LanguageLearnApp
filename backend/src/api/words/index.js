import { wordData } from "./wordData";
import express from 'express';

const router = express.router();

router.get('/api/words', (req, res) => {
  res.json(wordData);
});

export default router;