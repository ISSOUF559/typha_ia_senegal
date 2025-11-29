import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'API Zones - TYPHA IA Sénégal',
    status: 'active',
    version: '1.0.0'
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({ 
      message: 'Zone créée avec succès',
      data: body,
      id: Date.now().toString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur de traitement' },
      { status: 500 }
    )
  }
}