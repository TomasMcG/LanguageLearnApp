import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  topicName: { type: String, required: true },
});

export default mongoose.model("Topic", TopicSchema);
