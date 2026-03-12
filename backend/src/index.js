import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "../db/index.js";
import sentencesRouter from "./api/sentences/index.js";
import topicsRouter from "./api/topics/index.js";
import userWordsRouter from "./api/userWords/index.js";
import wordsRouter from "./api/words/index.js";
import { wordData } from "./api/words/wordData.js";
import generateSentencesRouter from "./api/openAI_API/index.js";

dotenv.config();
const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(wordData);
});
app.use("/api/words", wordsRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/userWords", userWordsRouter);
app.use("/api/sentences", sentencesRouter);
app.use("api/OpenAI_API", generateSentencesRouter)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
