// src/components/ui/label.tsx
import React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string
}

export const Label: React.FC<LabelProps> = ({ className = '', children, ...props }) => {
  return (
    <label className={`block text-sm font-medium text-gray-700 ${className}`} {...props}>
      {children}
    </label>
  )
}
