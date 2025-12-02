import * as React from "react"

const RadioGroup = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <div ref={ref} className={className} {...props}>
            {children}
        </div>
    )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <input
            type="radio"
            ref={ref}
            className={className}
            {...props}
        />
    )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
