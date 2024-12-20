import React, { useId, forwardRef, SelectHTMLAttributes } from 'react'

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label?: string;
  defaultLabel?: string;
  className?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  options,
  label,
  defaultLabel,
  className,
  ...props
}, ref) => {
  const id = useId()
  return (
    <div className='w-full mb-4'>
      {label && <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>{label}</label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`select w-full max-w-xs bg-white ${className}`}
      >
        {defaultLabel && <option value="" disabled selected>{defaultLabel}</option>}
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
})

Select.displayName = 'Select'

export default Select
