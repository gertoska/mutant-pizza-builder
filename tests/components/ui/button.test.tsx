import '@testing-library/jest-dom'
import { Button } from '@/components/ui/button'
import { render, screen, fireEvent } from '@testing-library/react'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies default classes', () => {
    render(<Button>Test</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass(
      'px-4',
      'py-2',
      'rounded',
      'font-bold',
      'text-white',
      'bg-green-500',
      'hover:bg-green-600'
    )
  })

  it('merges custom className with default classes', () => {
    render(<Button className="custom-class">Test</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
    expect(button).toHaveClass('bg-green-500') // Still has default classes
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('passes through additional props', () => {
    render(<Button data-testid="test-button" disabled>Test</Button>)
    const button = screen.getByTestId('test-button')
    expect(button).toBeDisabled()
  })
})
