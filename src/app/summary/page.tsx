'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Summary() {
  const searchParams = useSearchParams()
  const crust = searchParams.get('crust')
  const toppings = searchParams.get('toppings')
  const price = searchParams.get('price')

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-yellow-50/50">
      <h1 className="text-4xl font-bold text-red-600 mb-8">Your Pizza Summary</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Crust:</h2>
          <p className="capitalize">{crust}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Toppings:</h2>
          <ul className="list-disc list-inside">
            {(toppings as string)?.split(',').map((topping) => (
              <li key={topping} className="capitalize">
                {topping}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xl font-bold mb-6">Total Price: ${Number(price).toFixed(2)}</div>
        <Link href="/builder">
          <Button className="w-full bg-green-500 hover:bg-green-600">
            Build Another Pizza
          </Button>
        </Link>
      </div>
    </main>
  )
}
