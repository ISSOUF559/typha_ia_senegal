interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function Button({ children, onClick, variant = 'primary', className = '' }: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition"
  const variantClasses = variant === 'primary' 
    ? "bg-typha-600 text-white hover:bg-typha-700" 
    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
  
  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}