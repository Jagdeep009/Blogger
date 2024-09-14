import React from 'react'

function Button({
    children,
    type = "button",
    bgcolor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
  return (
    <button className={`${className} px-4 py-2 ${bgcolor} ${textColor} rounded-lg`} {...props}>
        {children}
    </button>
  )
}

export default Button