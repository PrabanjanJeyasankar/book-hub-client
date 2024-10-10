import React from 'react'
import PropTypes from 'prop-types'
import './ButtonComponent.css'

const Button = ({
    type = 'button',
    className,
    onClick,
    children,
    disabled,
}) => {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </button>
    )
}

Button.propTypes = {
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
}

export default Button
