import { NextResponse } from 'next/server'

let quizzes: any[] = []

export async function POST(req: Request) {
  const { gameCode, playerName } = await req.json()
  const quiz = quizzes.find(q => q.id === gameCode)
  if (quiz) {
    quiz.players.push(playerName)
    return new NextResponse('Joined successfully')
  } else {
    return new NextResponse('Game not found', { status: 404 })
  }
}

