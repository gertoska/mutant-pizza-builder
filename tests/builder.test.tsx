import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import Builder from '../src/app/builder/page'

// Mock the next/navigation hook
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

  it('renders the builder page title', () => {
    render(<Builder />)
    expect(screen.getByText('Build Your Pizza')).toBeInTheDocument()
  })

  it('renders all crust options', () => {
    render(<Builder />)
    expect(screen.getByLabelText('Thin')).toBeInTheDocument()
    expect(screen.getByLabelText('Thick')).toBeInTheDocument()
    expect(screen.getByLabelText('Stuffed')).toBeInTheDocument()
  })

  it('renders all topping options', () => {
    render(<Builder />)
    const toppings = ['pepperoni', 'cheese', 'mushrooms', 'olives', 'peppers', 'pineapple']
    toppings.forEach(topping => {
      expect(screen.getByLabelText(topping, { exact: false })).toBeInTheDocument()
    })
  })

  it('calculates price correctly when selecting toppings', () => {
    render(<Builder />)
    // Base price for thin crust is $8
    expect(screen.getByText('Price: $8.00')).toBeInTheDocument()

    // Add two toppings ($1.50 each)
    fireEvent.click(screen.getByLabelText('pepperoni', { exact: false }))
    fireEvent.click(screen.getByLabelText('cheese', { exact: false }))

    expect(screen.getByText('Price: $11.00')).toBeInTheDocument()
  })

  it('updates price when changing crust type', () => {
    render(<Builder />)

    // Change to stuffed crust ($12)
    fireEvent.click(screen.getByLabelText('Stuffed'))
    expect(screen.getByText('Price: $12.00')).toBeInTheDocument()
  })

  it('shows alert when submitting without toppings', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()
    render(<Builder />)
    
    fireEvent.click(screen.getByText('Build Pizza'))
    
    expect(alertMock).toHaveBeenCalledWith('Please select at least one topping')
    alertMock.mockRestore()
  })

  it('shows alert when selecting pineapple', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()
    render(<Builder />)
    
    // Select pineapple and another valid topping
    fireEvent.click(screen.getByLabelText('pineapple', { exact: false }))
    fireEvent.click(screen.getByLabelText('cheese', { exact: false }))
    
    fireEvent.click(screen.getByText('Build Pizza'))
    
    expect(alertMock).toHaveBeenCalledWith('What kind of monster puts pineapple on pizza? Please remove it.')
    alertMock.mockRestore()
  })

  it('navigates to summary page with correct parameters', () => {
    render(<Builder />)
    
    // Select crust and toppings
    fireEvent.click(screen.getByRole('radio', { name: 'Thick' }))
    fireEvent.click(screen.getByLabelText('pepperoni', { exact: false }))
    fireEvent.click(screen.getByLabelText('cheese', { exact: false }))
    
    fireEvent.click(screen.getByText('Build Pizza'))
    
    expect(mockPush).toHaveBeenCalledWith(
      '/summary?crust=thick&toppings=pepperoni,cheese&price=13'
    )
  })

  it('should add a topping when it is not already selected', () => {
    const { getByLabelText } = render(<Builder />)
    
    // Find and click the pepperoni checkbox
    const pepperoniCheckbox = getByLabelText('pepperoni')
    fireEvent.click(pepperoniCheckbox)
    
    // Check if the checkbox is checked (topping was added)
    expect(pepperoniCheckbox).toBeChecked()
  })

  it('should remove a topping when it is already selected', () => {
    const { getByLabelText } = render(<Builder />)
    
    // First, add the topping
    const pepperoniCheckbox = getByLabelText('pepperoni')
    fireEvent.click(pepperoniCheckbox)
    expect(pepperoniCheckbox).toBeChecked()
    
    // Then remove it by clicking again
    fireEvent.click(pepperoniCheckbox)
    expect(pepperoniCheckbox).not.toBeChecked()
  })

  it('should allow multiple toppings to be selected', () => {
    const { getByLabelText } = render(<Builder />)
    
    // Select multiple toppings
    const pepperoniCheckbox = getByLabelText('pepperoni')
    const cheeseCheckbox = getByLabelText('cheese')
    
    fireEvent.click(pepperoniCheckbox)
    fireEvent.click(cheeseCheckbox)
    
    expect(pepperoniCheckbox).toBeChecked()
    expect(cheeseCheckbox).toBeChecked()
  })
})
