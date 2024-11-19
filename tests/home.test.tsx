import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'

// Mock the next/link component since we're testing client-side navigation
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

describe('Home Page', () => {
  it('renders the welcome message', () => {
    render(<Home />)
    
    expect(screen.getByText('Welcome to Mutant Pizza Builder!')).toBeInTheDocument()
  })

  it('renders the start building button', () => {
    render(<Home />)
    
    const button = screen.getByRole('button', { name: /start building/i })
    expect(button).toBeInTheDocument()
  })

  it('has correct link to builder page', () => {
    render(<Home />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/builder')
  })
})
