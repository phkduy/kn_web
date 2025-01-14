'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function CreateQuiz() {
  const [questions, setQuestions] = useState([{ question: '', answers: ['', '', '', ''], correctAnswer: 0 }])
  const [quizName, setQuizName] = useState('')
  const router = useRouter()

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answers: ['', '', '', ''], correctAnswer: 0 }])
  }

  const updateQuestion = (index: number, field: string, value: string | number) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
    setQuestions(updatedQuestions)
  }

  const updateAnswer = (questionIndex: number, answerIndex: number, value: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].answers[answerIndex] = value
    setQuestions(updatedQuestions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: quizName, questions }),
    })
    const data = await response.json()
    router.push(`/lobby/${data.id}`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Quiz Name"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          required
        />
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="border p-4 rounded">
            <Textarea
              placeholder="Question"
              value={q.question}
              onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
              required
            />
            {q.answers.map((answer, aIndex) => (
              <div key={aIndex} className="flex items-center mt-2">
                <Input
                  type="text"
                  placeholder={`Answer ${aIndex + 1}`}
                  value={answer}
                  onChange={(e) => updateAnswer(qIndex, aIndex, e.target.value)}
                  required
                />
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={q.correctAnswer === aIndex}
                  onChange={() => updateQuestion(qIndex, 'correctAnswer', aIndex)}
                  required
                  className="ml-2"
                />
              </div>
            ))}
          </div>
        ))}
        <Button type="button" onClick={addQuestion}>Add Question</Button>
        <Button type="submit">Create Quiz</Button>
      </form>
    </div>
  )
}

