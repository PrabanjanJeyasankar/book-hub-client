function InputFieldComponent({
    id,
    name,
    type = 'text',
    value,
    placeholder,
    label,
    onChange,
    error,
    containerClass,
    inputClass,
    labelClass,
    errorClass,
    ...props
}) {
    return (
        <div className={containerClass}>
            <input
                type={type}
                id={id}
                name={name}
                className={inputClass}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                {...props}
            />
            <label htmlFor={id} className={labelClass}>
                {label}
            </label>
            {error && <p className={errorClass}>{error}</p>}
        </div>
    )
}

export default InputFieldComponent
