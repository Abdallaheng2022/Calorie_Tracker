import styles from "./CalorieRecord.module.css";
import StyledRecordCell from "./StyledRecordCell.jsx";
import CalorieRecordDate from "./CalorieRecordDate.jsx";
import {useEffect, useState, useContext} from "react";
import {AppContext} from "./AppContext";

/***
 * Coditional behavior: when the user clicks on the calories cell, it should increase the calories by 10 and update the display accordingly.
 * if the calories is negative, it should display a warning message and not update the calories.
 * 
 * 
 */
function CalorieRecord(props) {
    /*
    let [currentCalories, setCurrentCalories] = useState(props.calories);
    function OnClickHandler() {
     setCurrentCalories(currentCalories + 10);
    }*/
  const {setTotalCalories:addCalories} = useContext(AppContext)
  useEffect(() => {
   addCalories((prevTotal) => prevTotal + props.calories);
   /** Clean up section  which try to return something that useEffect repeated so the useEffect render two times so it calculated the total two times so the cleanup is opportunity to cleanup it */
   /** what the useEffect highlights ? it hook the repeated execution to manage the values of the variable and return to remove the duplicated effect of useEffect */
   return () => {
    addCalories((prevTotal) => prevTotal - props.calories);
   } 
  })   
  return (
    <ul className={styles['records']}>
    <li><StyledRecordCell>
      <span>{props.date.toLocaleDateString("en-US", { month: "long" })}</span>
      <span>{props.date.getDate()}</span>
      <span>{props.date.getFullYear()}</span>
    </StyledRecordCell></li>
    
   <li>
      {props.mealtype}
   </li>
    <li>
      {props.content}
    </li>
    <li className={styles['record-calories']} /*onClick={OnClickHandler}*/>
        <StyledRecordCell>{props.calories}</StyledRecordCell>
    </li>
    </ul>
  );
}

export default CalorieRecord;