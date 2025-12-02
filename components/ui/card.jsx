import * as React from "react"

const Card = React.forwardRef(({ className, children, ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
        {children}
    </div>
))
Card.displayName = "Card"

const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
        {children}
    </div>
))
CardContent.displayName = "CardContent"

export { Card, CardContent }
