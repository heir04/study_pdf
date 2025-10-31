import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/lib/config';

export async function GET(request) {
  try {
    const token = request.headers.get('authorization');
    
    if (!token) {
      return NextResponse.json(
        { status: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/summary/getall`, {
      method: 'GET',
      headers: {
        'Authorization': token,
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Get all summaries proxy error:', error);
    return NextResponse.json(
      { status: false, message: 'Failed to get summaries' },
      { status: 500 }
    );
  }
}
