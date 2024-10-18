import React from 'react'
import PropTypes from 'prop-types'
import './ButtonComponent.css'

const Button = ({
    type = 'button',
    className,
    onClick,
    children,
    disabled,
    svgPath,
}) => {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            disabled={disabled}>
            {children}
            {svgPath && (
                <svg viewBox='0 0 512 512' className='svg'>
                    <path d={svgPath}></path>
                </svg>
            )}
        </button>
    )
}

Button.propTypes = {
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    svgPath: PropTypes.string,
}

export default Button
