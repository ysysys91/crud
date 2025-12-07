import User from '@/models/user'
import connectMongoDB from '@/libs/mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    await connectMongoDB()

    // 이미 존재하는 유저인지 확인
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists', user: existingUser },
        { status: 200 }
      )
    }

    // 없으면 생성
    const user = await User.create({ name, email })

    return NextResponse.json(
      { message: 'User registered', user },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error registering user:', error)

    return NextResponse.json(
      { error: 'Failed to register user', details: error.message },
      { status: 500 }
    )
  }
}
