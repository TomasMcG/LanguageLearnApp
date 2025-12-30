import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WordSchema = new Schema({
  wordId: { type:Number, required: true },
  created_at: {type:Date, default: Date.now},
  wordName: { type: String, required: true },
  wordAltNames: { type: String}

});


export default mongoose.model('Word', WordSchema);
