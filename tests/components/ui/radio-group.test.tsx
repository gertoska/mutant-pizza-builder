import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'

describe('RadioGroup Component', () => {
  it('throws error when RadioGroupItem is used outside RadioGroup', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(<RadioGroupItem value="test" id="test" />)
    }).toThrow('RadioGroupItem must be used within a RadioGroup')
    
    consoleError.mockRestore()
  })

  it('calls onValueChange handler when selection changes', () => {
    const onValueChangeMock = jest.fn()
    
    render(
      <RadioGroup value="option1" onValueChange={onValueChangeMock}>
        <div>
          <RadioGroupItem value="option1" id="option1" />
          <label htmlFor="option1">option1</label>
          <RadioGroupItem value="option2" id="option2" />
          <label htmlFor="option2">option2</label>
        </div>
      </RadioGroup>
    )
    
    fireEvent.click(screen.getByLabelText('option2'))
    expect(onValueChangeMock).toHaveBeenCalledWith('option2')
  })
})
