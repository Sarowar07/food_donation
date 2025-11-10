import { ButtonHTMLAttributes } from "react";

const Button=({ children, onClick, type = "button", className = "" })=>{
    return (
        <button className={`bg-primary p-3 mt-3 w-1/2 rounded hover:scale-105 hover:bg-primary/90  ${className}`} >{children} </button>
    )
    
}
export default Button