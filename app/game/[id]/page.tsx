'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Game({ params }: { params: { id: string } }) {
  const [question, setQuestion] = useState<string>('')
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  useEffect(() => {
    const eventSource = new EventSource(`/api/game/${params.id}`)
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.question) {
        setQuestion(data.question)
        setAnswers(data.answers)
        setSelectedAnswer(null)
      }
    }
    return () => eventSource.close()
  }, [params.id])

  const submitAnswer = async () => {
    if (selectedAnswer !== null) {
      await fetch(`/api/answer/${params.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: selectedAnswer }),
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{question}</h1>
      <div className="grid grid-cols-2 gap-4">
        {answers.map((answer, index) => (
          <Button
            key={index}
            onClick={() => setSelectedAnswer(index)}
            variant={selectedAnswer === index ? 'default' : 'outline'}
          >
            {answer}
          </Button>
        ))}
      </div>
      <Button onClick={submitAnswer} className="mt-4" disabled={selectedAnswer === null}>
        Submit Answer
      </Button>
    </div>
  )
}

