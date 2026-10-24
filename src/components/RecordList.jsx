import styles from './RecordList.module.css'
import CalorieRecordDate from './CalorieRecordDate.jsx'
import CalorieRecord from './CalorieRecord.jsx'
import { useState,useContext } from 'react'
import {AppContext} from './AppContext';
import {Link} from "react-router-dom"
/*import styled from 'styled-components'*/
/**const ListItem = styled.ul`
   styled-components is a library for React and React Native that allows you to use component-level styles in your application. It is written with a mixture of JavaScript and CSS using a technique called CSS-in-JS.
    display: flex;
    flex-direction: column;
    gap: 10px;
    list-style: none;
    border: 2px solid #fa4300;
    width:1000px;
    padding: 10px;
    background-color: gray;
    border-radius: 20px;
    margin: 20px auto;` 
    */


/**
 * @param {[{
 *   date: Date,
 *   mealtype: string,
 *   content: string,
 *   calories: number
 * }]} props
 */


function RecordList(props) {
    /** 
   const day = props.date.getDate();
   const month = props.date.toLocaleDateString('default', { month: 'long' });
   const year = props.date.getFullYear();

   const mealtype = props.mealtype;
   const meal = props.content;
   const calories = props.calories;**/
   console.log("render: RecordList", performance.now());
   const {totalCalories, setTotalCalories} = useContext(AppContext);
   const recordId = crypto.randomUUID();
   
    const ResultElement = props['records']?.length ? (
                <ul className={styles['record-list']}>
                {props['records'].map((record, index) => (
                    
                    <li key={recordId} className={styles['list-item']}> 
                        <Link to={`${recordId}`}><CalorieRecord 
                           {...record}
                        /></Link>
                    </li>
                ))}
            </ul>):(<div className={styles.placeholder}>No Record Found For This Date</div>);
    
    return <>
              {ResultElement}
              <label className={styles["total-calories"]}>Total Calories Count: {totalCalories}</label>
           </>
        
    



}
export default RecordList;