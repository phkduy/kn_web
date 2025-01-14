'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function HostGame({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quiz, setQuiz] = useState<any>(null)

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await fetch(`/api/quiz/${params.id}`)
      const data = await response.json()
      setQuiz(data)
    }
    fetchQuiz()
  }, [params.id])

  const nextQuestion = async () => {
    if (currentQuestion < quiz.questions.length - 1) {
      await fetch(`/api/next/${params.id}`, { method: 'POST' })
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // End the game
      await fetch(`/api/end/${params.id}`, { method: 'POST' })
    }
  }

  if (!quiz) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hosting: {quiz.name}</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Question {currentQuestion + 1}:</h2>
        <p>{quiz.questions[currentQuestion].question}</p>
      </div>
      <Button onClick={nextQuestion}>
        {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'End Game'}
      </Button>
    </div>
  )
}

