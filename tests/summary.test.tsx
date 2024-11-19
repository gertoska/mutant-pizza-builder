import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { useSearchParams } from 'next/navigation'
import Summary from '../src/app/summary/page'

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn()
}))

describe('Summary Page', () => {
  const mockSearchParams = new Map([
    ['crust', 'thick'],
    ['toppings', 'pepperoni,cheese'],
    ['price', '13']
  ])

  beforeEach(() => {
    ;(useSearchParams as jest.Mock).mockReturnValue({
      get: (param: string) => mockSearchParams.get(param)
    })
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
