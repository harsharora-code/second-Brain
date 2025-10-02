import type { ReactElement } from "react";

export interface buttonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
} 

const variantStyles  =   {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-400 text-purple-600",

}
const sizeStyles =  {
    "lg": "px-8 py-4 text-xl rounded-xl",
    "md": "px-4 py-2 text-md rounded-md",
    "sm": "px-2 py-1 text-sm rounded-sm",

}
const defaultStyles = "rounded-md-flex"
export const Buttton = (props: buttonProps) => {
    return  <button className={`${sizeStyles[props.size]} ${defaultStyles}  ${sizeStyles[props.size]}`}> {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.text} {props.endIcon}</button>

}
