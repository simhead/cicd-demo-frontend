import React from "react";
import './Button.css'

const STYLES = [
    'btn--primary',
    'brn-outline'
]

const SIZES = [
    'btn--medium',
    'brn-large'
]

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return(
        <button className={'btwn ${checkButtonStyle} ${checkButtonSize}'} onClick={onClick} type={type}>
            {children}
        </button>
    )
}