'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const CRUST_PRICES = {
  thin: 8,
  thick: 10,
  stuffed: 12,
}

const TOPPING_PRICE = 1.5

const TOPPINGS = ['pepperoni', 'cheese', 'mushrooms', 'olives', 'peppers', 'pineapple']

export default function Builder() {
  const [crust, setCrust] = useState('thin')
  const [toppings, setToppings] = useState<string[]>([])
  const router = useRouter()

  const calculatePrice = () => {
    return CRUST_PRICES[crust as keyof typeof CRUST_PRICES] + toppings.length * TOPPING_PRICE
  }

  const handleToppingChange = (topping: string) => {
    setToppings((prev) =>
      prev.includes(topping) ? prev.filter((t) => t !== topping) : [...prev, topping]
    )
  }

  const handleSubmit = () => {
    if (toppings.length === 0) {
      alert('Please select at least one topping')
      return
    }
    if (toppings.includes('pineapple')) {
      alert('What kind of monster puts pineapple on pizza? Please remove it.')
      return
    }
    router.push(
      `/summary?crust=${crust}&toppings=${toppings.join(',')}&price=${calculatePrice()}`
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50/50 p-4">
      <h1 className="text-3xl font-bold text-red-600 mb-8">Build Your Pizza</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Choose your crust:</h2>
        <RadioGroup value={crust} onValueChange={setCrust} className="mb-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="thin" id="thin" />
            <Label htmlFor="thin">Thin</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="thick" id="thick" />
            <Label htmlFor="thick">Thick</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="stuffed" id="stuffed" />
            <Label htmlFor="stuffed">Stuffed</Label>
          </div>
        </RadioGroup>

        <h2 className="text-xl font-semibold mb-4">Choose your toppings:</h2>
        <div className="space-y-2 mb-6">
          {TOPPINGS.map((topping) => (
            <div key={topping} className="flex items-center">
              <Checkbox
                id={topping}
                checked={toppings.includes(topping)}
                onChange={() => handleToppingChange(topping)}
              />
              <label htmlFor={topping} className="ml-2 capitalize">
                {topping}
              </label>
            </div>
          ))}
        </div>

        <div className="text-xl font-bold mb-6">Price: ${calculatePrice().toFixed(2)}</div>

        <Button 
          onClick={handleSubmit} 
          className="w-full bg-green-500 hover:bg-green-600 text-white"
        >
          Build Pizza
        </Button>
      </div>
    </div>
  )
}
