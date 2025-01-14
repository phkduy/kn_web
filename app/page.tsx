import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen relative"
      style={{
        backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KN_background.jpg-YR1fU8Bxw22vHvgEPzP4mWWUCIOxHh.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">Kahoot Clone</h1>
      <div className="flex flex-row gap-6">
        <Link href="/create">
          <Button variant="secondary" className="w-48 text-lg">Create Quiz</Button>
        </Link>
        <Link href="/join">
          <Button variant="secondary" className="w-48 text-lg">Join Quiz</Button>
        </Link>
      </div>
    </div>
  )
}

