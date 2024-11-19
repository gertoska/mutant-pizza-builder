// src/components/ui/radio-group.tsx
import React from 'react'

interface RadioGroupProps {
  value: string
  onValueChange: (value: string) => void
  className?: string
  children: React.ReactNode
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onValueChange,
  className = '',
  children,
}) => {
  // Create context to pass down the value and onChange handler
  const contextValue = React.useMemo(
    () => ({ value, onValueChange }),
    [value, onValueChange]
  )

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div data-testid="radiogroup" className={`space-y-2 ${className}`}>{children}</div>
    </RadioGroupContext.Provider>
  )
}

// Add RadioGroup context
const RadioGroupContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
} | null>(null)

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ value, id, onChange, ...props }) => {
  // Get context values
  const context = React.useContext(RadioGroupContext)
  if (!context) {
    throw new Error('RadioGroupItem must be used within a RadioGroup')
  }

  return (
    <input
      type="radio"
      id={id}
      value={value}
      checked={context.value === value}
      onChange={(e) => {
        context.onValueChange(e.target.value)
        onChange?.(e)
      }}
      className="form-radio h-4 w-4 text-green-600"
      {...props}
    />
  )
}