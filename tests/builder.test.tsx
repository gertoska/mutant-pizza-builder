import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import Builder from '../src/app/builder/page'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Builder Page', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    // Setup router mock before each test
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
  })

  it('applies correct discount tiers based on topping count', () => {
    render(<Builder />)
    
    const fourToppings = ['pepperoni', 'cheese', 'mushrooms', 'olives']
    fourToppings.forEach(topping => {
      fireEvent.click(screen.getByLabelText(topping, { exact: false }))
    })
    expect(screen.getByText('Price: $13.30')).toBeInTheDocument()
  })

  it('shows alert when selecting pineapple', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()
    render(<Builder />)
    
    fireEvent.click(screen.getByLabelText('pineapple', { exact: false }))
    fireEvent.click(screen.getByLabelText('cheese', { exact: false }))
    
    fireEvent.click(screen.getByText('Build Pizza'))
    
    expect(alertMock).toHaveBeenCalledWith('What kind of monster puts pineapple on pizza? Please remove it.')
    alertMock.mockRestore()
  })

  it('navigates to summary page with correct parameters', () => {
    render(<Builder />)
    
    fireEvent.click(screen.getByLabelText('thick', { exact: false }))
    fireEvent.click(screen.getByLabelText('pepperoni', { exact: false }))
    fireEvent.click(screen.getByLabelText('cheese', { exact: false }))
    
    fireEvent.click(screen.getByText('Build Pizza'))
    
    expect(mockPush).toHaveBeenCalledWith(
      '/summary?crust=thick&toppings=pepperoni,cheese&price=13'
    )
  })

  it('prevents submission when no toppings are selected', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()
    render(<Builder />)
    
    fireEvent.click(screen.getByText('Build Pizza'))
    
    expect(alertMock).toHaveBeenCalledWith('Please select at least one topping')
    
    alertMock.mockRestore()
  })
})
