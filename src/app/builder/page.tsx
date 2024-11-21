'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { CRUST_PRICES, TOPPING_PRICE, TOPPINGS, CRUSTS } from '@/constants/pizza'

export default function Builder() {
  const [toppings, setToppings] = useState<Record<string, boolean>>({})
  const [crust, setCrust] = useState(CRUSTS[0])
  const router = useRouter()

  const calculatePrices = () => {
    const toppingCount = Object.values(toppings).filter(Boolean).length
    const basePrice = CRUST_PRICES[crust as keyof typeof CRUST_PRICES] + toppingCount * TOPPING_PRICE
    
    let discount = 0
    if (toppingCount > 3) {
      discount = 0.05
    }
    
    if (toppings['peppers'] && toppings['mushrooms']) {
      discount += 0.05
    }
    
    return {
      original: Number(basePrice.toFixed(2)),
      final: Number((basePrice * (1 - discount)).toFixed(2)),
      hasDiscount: discount > 0
    }
  }

  const handleToppingChange = (topping: string) => {
    setToppings(prev => ({
      ...prev,
      [topping]: !prev[topping]
    }))
  }

  const handleSubmit = () => {
    const selectedToppings = Object.entries(toppings)
      .filter(([, selected]) => selected)
      .map(([topping]) => topping)

    if (selectedToppings.length === 0) {
      alert('Please select at least one topping')
      return
    }
    if (toppings['pineapple']) {
      alert('What kind of monster puts pineapple on pizza? Please remove it.')
      return
    }

    router.push(
      `/summary?crust=${crust}&toppings=${selectedToppings.join(',')}&price=${calculatePrices().final}`
    )
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-yellow-50/50">
      <h1 className="text-4xl font-bold text-red-600 mb-8">Build Your Pizza</h1>
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 max-w-md">
        <strong className="font-bold">Special Offer!</strong>
        <p className="block sm:inline"> Get 5% off when you combine peppers and mushrooms on your pizza! 🫑🍄</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Choose your crust:</h2>
        <RadioGroup value={crust} onValueChange={setCrust} className="mb-6">
          {CRUSTS.map((crustType) => (
            <div key={crustType} className="flex items-center space-x-2">
              <RadioGroupItem value={crustType} id={crustType} />
              <Label htmlFor={crustType} className="capitalize">{crustType}</Label>
            </div>
          ))}
        </RadioGroup>

        <h2 className="text-xl font-semibold mb-4">Choose your toppings:</h2>
        <div className="space-y-2 mb-6">
          {TOPPINGS.map((topping) => (
            <div key={topping} className="flex items-center">
              <Checkbox
                id={topping}
                checked={!!toppings[topping]}
                onChange={() => handleToppingChange(topping)}
              />
              <label htmlFor={topping} className="ml-2 capitalize">
                {topping}
              </label>
            </div>
          ))}
        </div>

        <div className="text-xl font-bold mb-6">
          {calculatePrices().hasDiscount ? (
            <div>Price:
              <span className="line-through text-gray-500 ml-2">${calculatePrices().original.toFixed(2)}</span>
              <span className="ml-2 text-green-600">${calculatePrices().final.toFixed(2)}</span>
            </div>
          ) : (
            <div>Price: ${calculatePrices().final.toFixed(2)}</div>
          )}
        </div>

        <Button 
          onClick={handleSubmit} 
          className="w-full bg-green-500 hover:bg-green-600"
        >
          Build Pizza
        </Button>
      </div>
    </main>
  )
}
