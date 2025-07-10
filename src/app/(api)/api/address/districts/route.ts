import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    const response = await fetch(`${process.env.ADDRESS_API_URL}kecamatan/get/?d_kabkota_id=${id}`, {
        method: 'GET',
      
    });
  
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error('Proxy Error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch data from external API', status: false},
      { status: 500 }
    );
  }
}