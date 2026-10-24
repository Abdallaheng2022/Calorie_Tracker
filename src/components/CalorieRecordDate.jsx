
import './CalorieRecordDate.css'
import StyledRecordCell from './StyledRecordCell.jsx'
function CalorieRecordDate(props){

return(
    <StyledRecordCell>
        <span>{props.date.toLocaleDateString('default', { month: 'long' })}</span>
        <span>{props.date.getDate()}</span>
        <span>{props.date.getFullYear()}</span>
    </StyledRecordCell>
)


}

export default CalorieRecordDate;