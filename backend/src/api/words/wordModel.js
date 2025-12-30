import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WordSchema = new Schema({
  wordId: { type:Number, required: true },
  wordName: { type: String, required: true },
  wordTranslation: {type: String}

});


export default mongoose.model('Word', WordSchema);
