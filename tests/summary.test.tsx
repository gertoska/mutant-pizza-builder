import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { useSearchParams } from 'next/navigation'
import Summary from '../src/app/summary/page'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn()
}))

// Mock next/link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

describe('Summary Page', () => {
  const mockSearchParams = new Map([
    ['crust', 'thick'],
    ['toppings', 'pepperoni,cheese'],
    ['price', '13']
  ])

  beforeEach(() => {
    // Setup search params mock before each test
    ;(useSearchParams as jest.Mock).mockReturnValue({
      get: (param: string) => mockSearchParams.get(param)
    })
  })

  it('renders the summary page title', () => {
    render(<Summary />)
    expect(screen.getByText('Your Pizza Summary')).toBeInTheDocument()
  })

  it('displays the selected crust type', () => {
    render(<Summary />)
    expect(screen.getByText('thick')).toBeInTheDocument()
  })

  it('displays all selected toppings', () => {
    render(<Summary />)
    expect(screen.getByText('pepperoni')).toBeInTheDocument()
    expect(screen.getByText('cheese')).toBeInTheDocument()
  })

  it('displays the correct total price', () => {
    render(<Summary />)
    expect(screen.getByText('Total Price: $13.00')).toBeInTheDocument()
  })

  it('has a link to build another pizza', () => {
    render(<Summary />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/builder')
  })

  it('renders the build another pizza button', () => {
    render(<Summary />)
    const button = screen.getByRole('button', { name: /build another pizza/i })
    expect(button).toBeInTheDocument()
  })
})
