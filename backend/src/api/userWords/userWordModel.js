import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WordSchema = new Schema({
  wordId: { type: Number, required: true },
  userId: { type: String, required: true },
  proficiencyLevel: { type: Number, required: true },
  lastReviewed: { type: Number, required: true },
  timeToNextReview: { type: Number, required: true },
  isKnown: { type: Number, required: true },
});

export default mongoose.model("UserWord", WordSchema);
