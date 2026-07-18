import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import { QuestionData } from '@/lib/db/models/Question';

// Get questions list for a product
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Missing productId parameter' }, { status: 400 });
    }

    await dbConnect();

    const questions = await QuestionData.find({ productId }).sort({ createdAt: -1 });
    return NextResponse.json(questions);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Post a question or answer a question
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, customerId, customerName, questionText, questionId, sellerId, responderName, answerText } = body;

    await dbConnect();

    // Case 1: Answer a question
    if (questionId) {
      if (!answerText || !responderName) {
        return NextResponse.json({ error: 'Missing answerText or responderName' }, { status: 400 });
      }

      const question = await QuestionData.findById(questionId);
      if (!question) {
        return NextResponse.json({ error: 'Question not found' }, { status: 404 });
      }

      question.answers.push({
        sellerId,
        responderName,
        answerText,
        createdAt: new Date()
      });

      await question.save();
      return NextResponse.json({ success: true, question });
    }

    // Case 2: Post a new question
    if (!productId || !customerId || !customerName || !questionText) {
      return NextResponse.json({ error: 'Missing required question fields' }, { status: 400 });
    }

    const question = new QuestionData({
      productId,
      customerId,
      customerName,
      questionText,
      answers: []
    });

    await question.save();
    return NextResponse.json({ success: true, question }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
