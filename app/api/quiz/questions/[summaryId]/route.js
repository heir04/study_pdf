import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/lib/config';

export async function GET(request, { params }) {
  try {
    const token = request.headers.get('authorization');
    const { summaryId } = params;
    
    if (!token) {
      return NextResponse.json(
        { status: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/quiz/get/quiz-questions/${summaryId}`, {
      method: 'GET',
      headers: {
        'Authorization': token,
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Get quiz questions proxy error:', error);
    return NextResponse.json(
      { status: false, message: 'Failed to get quiz questions' },
      { status: 500 }
    );
  }
}
