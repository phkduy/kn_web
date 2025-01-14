import { NextResponse } from 'next/server'

let quizzes: any[] = []

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const quiz = quizzes.find(q => q.id === params.id)
  if (quiz) {
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        const sendPlayers = () => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ players: quiz.players })}\n\n`))
        }
        sendPlayers()
        const interval = setInterval(sendPlayers, 1000)
        return () => clearInterval(interval)
      }
    })
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } else {
    return new NextResponse('Quiz not found', { status: 404 })
  }
}

