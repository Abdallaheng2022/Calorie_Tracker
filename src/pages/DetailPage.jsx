
import { Link,useParams } from "react-router-dom"
export function DetailPage(){
const params = useParams(); 
return <>
        <p>This is the record under ID {params.recordId}</p>
        <p><Link to=".." relative="path">Back to the list</Link></p>
       </>



}