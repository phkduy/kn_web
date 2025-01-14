import { NextResponse } from 'next/server'

let quizzes: any[] = []

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const quiz = quizzes.find(q => q.id === params.id)
  if (quiz) {
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        const sendQuestion = () => {
          if (quiz.currentQuestion < quiz.questions.length) {
            const question = quiz.questions[quiz.currentQuestion]
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              question: question.question,
              answers: question.answers
            })}\n\n`))
          }
        }
        sendQuestion()
        const interval = setInterval(sendQuestion, 1000)
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

