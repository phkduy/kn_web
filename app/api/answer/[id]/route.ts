import { NextResponse } from 'next/server'

let quizzes: any[] = []

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { answer } = await req.json()
  const quiz = quizzes.find(q => q.id === params.id)
  if (quiz) {
    // Here you would typically store the answer and update scores
    // For simplicity, we're just acknowledging the answer
    return new NextResponse('Answer received')
  } else {
    return new NextResponse('Quiz not found', { status: 404 })
  }
}

