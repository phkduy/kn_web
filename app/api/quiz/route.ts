import { NextResponse } from 'next/server'

let quizzes: any[] = []

export async function POST(req: Request) {
  const quiz = await req.json()
  const id = Math.random().toString(36).substr(2, 6)
  quizzes.push({ id, ...quiz, players: [] })
  return NextResponse.json({ id })
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  const quiz = quizzes.find(q => q.id === id)
  if (quiz) {
    return NextResponse.json(quiz)
  } else {
    return new NextResponse('Quiz not found', { status: 404 })
  }
}

