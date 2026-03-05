import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WordSchema = new Schema({
  wordId: { type: mongoose.Schema.Types.ObjectId, required: true },
  wordName: { type: String, required: true },
  wordTranslation: { type: String },
  topicName: { type: String, required: true },
});

export default mongoose.model("Word", WordSchema);