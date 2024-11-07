import React from 'react'
import InputFieldComponent from '../InputFieldComponent/InputFieldComponent'
import otpInputStyles from './OtpInputComponent.module.css'

function OtpInputComponent({ value, onChange }) {
    if (!Array.isArray(value)) {
        console.error('Value prop should be an array')
        return null
    }

    const handleInputChange = (index, newValue) => {
        if (/^[0-9]?$/.test(newValue)) {
            const newOtp = [...value]
            newOtp[index] = newValue
            onChange(newOtp)

            if (newValue && index < value.length - 1) {
                const nextInput = document.getElementById(`otp-${index + 1}`)
                nextInput.focus()
            }
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            const newOtp = [...value]

            if (!newOtp[index]) {
                if (index > 0) {
                    newOtp[index - 1] = ''
                    onChange(newOtp)

                    const prevInput = document.getElementById(
                        `otp-${index - 1}`
                    )
                    prevInput.focus()
                }
            } else {
                newOtp[index] = ''
                onChange(newOtp)
            }
        }
    }

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData('Text')
        if (/^\d{6}$/.test(pasteData)) {
            const newOtp = pasteData.split('')
            onChange(newOtp)

            const lastInput = document.getElementById(
                `otp-${newOtp.length - 1}`
            )
            lastInput.focus()
        }
        e.preventDefault()
    }

    return (
        <div className={otpInputStyles.otpInputContainer}>
            {value.map((digit, index) => (
                <InputFieldComponent
                    key={index}
                    id={`otp-${index}`}
                    name={`otp-${index}`}
                    type='text'
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    maxLength={1}
                    containerClass={otpInputStyles.inputFieldContainer}
                    inputClass={otpInputStyles.otpInput}
                    errorClass={otpInputStyles.error}
                />
            ))}
        </div>
    )
}

export default OtpInputComponent
