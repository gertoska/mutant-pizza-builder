// src/components/ui/button.tsx
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export const Button: React.FC<ButtonProps> = ({ className = '', children, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded font-bold text-white bg-green-500 hover:bg-green-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
