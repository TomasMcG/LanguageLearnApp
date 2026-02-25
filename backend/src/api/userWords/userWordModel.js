import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WordSchema = new Schema({
  wordId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: String, required: true },
  proficiencyLevel: { type: Number },
  lastReviewed: { type: Date, default: Date.now},
  timeToNextReview: { type: Number, default:0 },
  nextReviewDate: {type: Date, default: Date.now},
  isKnown: { type: Number, required: true },
});

export default mongoose.model("UserWord", WordSchema);