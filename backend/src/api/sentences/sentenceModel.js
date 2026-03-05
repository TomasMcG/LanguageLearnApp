import mongoose from "mongoose";


const Schema = mongoose.Schema;

const SentenceSchema = new Schema({
 //sentenceId, made by mongo itself
  sentenceText  : { type: String, required: true },
  englishTranslation: { type: String },
    wordIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Word",
      required: true,
    },
  ],
  /*userId:{},*/
  topicName: { type: String, required: true },
});

export default mongoose.model("Sentence", SentenceSchema);