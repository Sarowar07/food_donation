import { ButtonHTMLAttributes } from "react";

const Button=({ children, onClick, type = "button", className = "" })=>{
    return (
        <button className={`bg-blue-600 p-3 mt-3 w-1/2 rounded hover:scale-110  ${className}`} >{children} </button>
    )
    
}
export default Button