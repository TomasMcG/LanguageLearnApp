import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "../db/index.js";
import wordsRouter from "./api/words/index.js";
import { wordData } from "./api/words/wordData.js";

dotenv.config();
const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(wordData);
});
app.use("/api/words", wordsRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
