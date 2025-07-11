import { NextResponse } from 'next/server';


if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}



export async function GET() {

    try {
        const response = await fetch(`${process.env.ADDRESS_API_URL}provinsi/get/`, {
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