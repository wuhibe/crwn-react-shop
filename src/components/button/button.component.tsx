import React from 'react'
import './button.styles.scss'

type ButtonType = 'default' | 'google' | 'inverted'

interface ButtonDefaultType {
  buttonType?: ButtonType
  children?: React.ReactNode
}

type ButtonProps = ButtonDefaultType & Record<string, string | object | boolean>

const Button = ({
  children,
  buttonType = 'default',
  ...otherProps
}: ButtonProps) => {
  return (
    <button className={`button-container ${buttonType}`} {...otherProps}>
      {children}
    </button>
  )
}

export default Button
