import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50/50">
      <h1 className="text-4xl font-bold text-red-600 mb-8">Welcome to Mutant Pizza Builder!</h1>
      <Link href="/builder">
        <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Start Building
        </Button>
      </Link>
    </div>
  )
}
