import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'

describe('RadioGroup Component', () => {
  const TestRadioGroup = () => {
    const options = ['option1', 'option2', 'option3']
    const [value, setValue] = React.useState('option1')

    return (
      <RadioGroup value={value} onValueChange={setValue}>
        {options.map((option) => (
          <div key={option}>
            <RadioGroupItem value={option} id={option} />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </RadioGroup>
    )
  }

  it('renders radio group with all options', () => {
    render(<TestRadioGroup />)
    
    expect(screen.getByLabelText('option1')).toBeInTheDocument()
    expect(screen.getByLabelText('option2')).toBeInTheDocument()
    expect(screen.getByLabelText('option3')).toBeInTheDocument()
  })

  it('selects the correct initial value', () => {
    render(<TestRadioGroup />)
    
    const option1 = screen.getByLabelText('option1') as HTMLInputElement
    expect(option1.checked).toBe(true)
  })

  it('changes selection when clicking different option', () => {
    render(<TestRadioGroup />)
    
    const option1 = screen.getByLabelText('option1') as HTMLInputElement
    const option2 = screen.getByLabelText('option2') as HTMLInputElement
    
    fireEvent.click(option2)
    
    expect(option1.checked).toBe(false)
    expect(option2.checked).toBe(true)
  })

  it('applies custom className to wrapper', () => {
    render(
      <RadioGroup value="test" onValueChange={() => {}} className="custom-class">
        <RadioGroupItem value="test" id="test" />
      </RadioGroup>
    )
    
    expect(screen.getByTestId('radiogroup')).toHaveClass('custom-class')
  })

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
