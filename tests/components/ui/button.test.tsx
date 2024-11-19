import '@testing-library/jest-dom'
import { Button } from '@/components/ui/button'
import { render, screen } from '@testing-library/react'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
