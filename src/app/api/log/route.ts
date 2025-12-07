import connectMongoDB from '@/libs/mongodb'
import Log from '@/models/Log'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    await connectMongoDB()
    await Log.create({ email })

    return NextResponse.json({ message: 'Login event logged' }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Failed to log login event', error: String(error) },
      { status: 500 }
    )
  }
}
