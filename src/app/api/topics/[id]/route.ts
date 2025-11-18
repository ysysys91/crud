import connectMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { NextRequest, NextResponse } from 'next/server'

// ✅ PUT: 주어진 id의 Topic 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Next.js 15: Promise 형태
) {
  try {
    const { id } = await params // ✅ 구조분해는 await 필요
    const { newTitle: title, newDescription: description } =
      await request.json()

    if (!title || !description) {
      return NextResponse.json(
        { message: 'Title과 Description 모두 필요합니다.' },
        { status: 400 }
      )
    }

    await connectMongoDB()
    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    )

    if (!updatedTopic) {
      return NextResponse.json(
        { message: 'Topic이 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Topic updated.' }, { status: 200 })
  } catch (error) {
    console.error('Error in PUT /api/topics/[id]:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// ✅ GET: 주어진 id의 Topic 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Promise로 지정
) {
  try {
    const { id } = await params
    await connectMongoDB()
    const topic = await Topic.findById(id)

    if (!topic) {
      return NextResponse.json(
        { message: 'Topic이 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ topic }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/topics/[id]:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// ✅ DELETE: 주어진 id의 Topic 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await connectMongoDB()
    const deletedTopic = await Topic.findByIdAndDelete(id)

    if (!deletedTopic) {
      return NextResponse.json(
        { message: 'Topic이 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Topic deleted.' }, { status: 200 })
  } catch (error) {
    console.error('Error in DELETE /api/topics/[id]:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
