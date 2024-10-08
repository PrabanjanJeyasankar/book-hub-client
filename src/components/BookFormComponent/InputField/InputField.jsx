import React from 'react'
import './InputField.css'

const InputField = ({
    outerDivClassName,
    label,
    name,
    value,
    onChange,
    error,
    type = 'text',
    options = null,
    className = '',
}) => {
    return (
        <div className={outerDivClassName}>
            <label className='form-label'>{label}</label>
            {type === 'select' ? (
                <select
                    name={name}
                    className={className}
                    value={value}
                    onChange={onChange}>
                    {options &&
                        options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                </select>
            ) : type === 'textarea' ? (
                <textarea
                    name={name}
                    className={className}
                    value={value}
                    onChange={onChange}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    className={className}
                    value={value}
                    onChange={onChange}
                />
            )}
            {error && <span className='error'>{error}</span>}
        </div>
    )
}

export default InputField
