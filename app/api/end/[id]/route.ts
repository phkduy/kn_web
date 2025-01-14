import { NextResponse } from 'next/server'

let quizzes: any[] = []

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const quiz = quizzes.find(q => q.id === params.id)
  if (quiz) {
    // Here you would typically calculate final scores and clean up
    quizzes = quizzes.filter(q => q.id !== params.id)
    return new NextResponse('Game ended')
  } else {
    return new NextResponse('Quiz not found', { status: 404 })
  }
}

