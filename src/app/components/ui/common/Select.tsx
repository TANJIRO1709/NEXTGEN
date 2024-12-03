import React, { useId } from 'react'

function Select({
    options,
    label,
    defaultLabel,
    className,
    ...props
}, ref) {
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
                <option disabled selected>{defaultLabel}</option>
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
