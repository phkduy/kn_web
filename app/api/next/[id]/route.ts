import { NextResponse } from 'next/server'

let quizzes: any[] = []

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const quiz = quizzes.find(q => q.id === params.id)
  if (quiz) {
    quiz.currentQuestion++
    return new NextResponse('Next question')
  } else {
    return new NextResponse('Quiz not found', { status: 404 })
  }
}

