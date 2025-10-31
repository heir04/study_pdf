import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/lib/config';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const token = request.headers.get('authorization');
    
    if (!token) {
      return NextResponse.json(
        { status: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/summary/create`, {
      method: 'POST',
      headers: {
        'Authorization': token,
      },
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Create summary proxy error:', error);
    return NextResponse.json(
      { status: false, message: 'Failed to create summary' },
      { status: 500 }
    );
  }
}
