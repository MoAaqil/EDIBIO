import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema({
  productId: { type: String, required: true, index: true },
  customerId: { type: String, required: true, index: true },
  customerName: { type: String, required: true },
  questionText: { type: String, required: true },
  answers: {
    type: [{
      sellerId: { type: String },
      responderName: { type: String, required: true },
      answerText: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }],
    default: []
  }
}, { timestamps: true });

export const QuestionData = mongoose.models.Question || mongoose.model('Question', QuestionSchema);
