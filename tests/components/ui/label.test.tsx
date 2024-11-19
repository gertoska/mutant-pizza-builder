import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Label } from '../../../src/components/ui/label'

describe('Label Component', () => {
  it('renders the label text correctly', () => {
    render(<Label>Test Label</Label>)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })
})
