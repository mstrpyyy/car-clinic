import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cityId = searchParams.get('cityId');
  const districtId = searchParams.get('districtId');

  try {
    const response = await fetch(`${process.env.ADDRESS_API_URL}kodepos/get/?d_kabkota_id=${cityId}&d_kecamatan_id=${districtId}`, {
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