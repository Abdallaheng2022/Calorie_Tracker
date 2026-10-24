
import { memo } from "react";
function Button(props){
const {children,type,...rest} = props;
console.log("Rendered Button: ",type)
return <button type={type}  {...rest}>{children}</button>
 

}

export default Button;