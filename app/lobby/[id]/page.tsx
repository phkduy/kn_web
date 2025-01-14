'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Lobby({ params }: { params: { id: string } }) {
  const [players, setPlayers] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const eventSource = new EventSource(`/api/lobby/${params.id}`)
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.players) {
        setPlayers(data.players)
      }
    }
    return () => eventSource.close()
  }, [params.id])

  const startGame = async () => {
    await fetch(`/api/start/${params.id}`, { method: 'POST' })
    router.push(`/host/${params.id}`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Game Lobby</h1>
      <p className="mb-4">Game Code: {params.id}</p>
      <h2 className="text-xl font-semibold mb-2">Players:</h2>
      <ul className="mb-4">
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
      <Button onClick={startGame}>Start Game</Button>
    </div>
  )
}

