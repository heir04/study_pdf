import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/lib/config';

export async function POST(request, { params }) {
  try {
    const token = request.headers.get('authorization');
    const { questionId } = params;
    const body = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { status: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/quiz/question/answer/${questionId}`, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Submit answer proxy error:', error);
    return NextResponse.json(
      { status: false, message: 'Failed to submit answer' },
      { status: 500 }
    );
  }
}
