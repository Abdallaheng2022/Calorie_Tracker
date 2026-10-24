import { useEffect, useState } from 'react'
import styles2 from './TrackPage.module.css' /** why we didn't put styles because the App is named App.css to get the access to styles we should  named the file to**/

import styles from '../components/RecordEdit.module.css'
import RecordList from '../components/RecordList'
import RecordEdit from '../components/RecordEdit'
import ListingSection from "../components/ListingSection"
import Modal from "react-modal";
/*const INITIAL_RECORDS = [
  { date: new Date(2026, 8, 22), mealtype: "BreakFast", content: "Eggs", calories: 340 },
  { date: new Date(2026, 8, 23), mealtype: "Lunch", content: "Chicken", calories: 600 },
  { date: new Date(2026, 8, 24), mealtype: "Dinner", content: "Cheese", calories: 200 },
  { date: new Date(2026, 8, 22), mealtype: "Snack", content: "Chocolate", calories: 500 }

];*/
const LOCALSTORAGENAME = "mealRecordStorage"
function loadRecords() {
  try {
    const stored = localStorage.getItem(LOCALSTORAGENAME);
    if (!stored || stored === "undefined") return [];
    return JSON.parse(stored).map((record) => ({
      ...record,
      date: new Date(record.date),
      calories: Number(record.calories),
    }));
  } catch {
    return [];
  }
}
export function TrackPage() {
  /**
   * التعامل مع دوال الجافا اسكربت بطريقة إني أبعت أتربيوت من خلالها واستقبله في دالة تحت مسمى مشترك
   * props
   * 
   */
  const [records, setRecords] = useState(loadRecords)
  const [alertMessage, setAlertMessage] = useState(null);
  const [IsModalOpen, setIsModalOpen] = useState(false);

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      innerWidth: "auto",
      innerHeight: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none", // Remove the border
      padding: "0px", // Remove padding
      borderRadius: "var(--theme-border-raduis-smooth)"
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    }
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);

  }

  const handleCloseModal = () => {
    setIsModalOpen(false);

  }
  const FromsubmitHandler = (recordData) => {
    const formattedDate =
    {
      ...recordData,
      date: new Date(recordData.date),
      calories: Number(recordData.calories)
    }
    
    let newRecords =[formattedDate, ...records].filter((record, index, self) => index === self.findIndex((r) => r.date.getTime() === record.date.getTime() && r.mealtype === record.mealtype && r.content === record.content && r.calories === record.calories)); 
    if (newRecords.length !== records.length + 1) {
      setAlertMessage("Duplicate record detected. The record will not be added.");
      
    }else{

      setAlertMessage("");
    }
    setRecords(newRecords);
    
    handleCloseModal();
  }


  function save() {
      
      localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(records));
      
  }

  useEffect(()=>{
     console.log("records changed", records)
    
    
     /**لو حطيت قيمة ايتدائية للمتغير اللي بيحفظ الحالة حطيته له قيمة فارغة للاسف كل مرة بيحمل فيها الصفحة هيصفر أو يفرغ  localstorage */
  
     save();
   
     

  },[records]);
  /**
   * React context solves the problem of nested children of compenents that need to access the same data. 
   * It allows you to create a context object that can be shared across multiple components, without having to pass props down through every level of the component tree.
   * as an example here: 
   * ListingSection component needs to acess the total calories count but it is nested inside the App component and RecordList component.
   */
  return (
    <div className="TrackPage">
      <h1>Calorie Tracker</h1>
      <p>Track your daily calorie intake and make healthier choices!</p>
      
      <Modal isOpen={IsModalOpen} onRequestClose={handleCloseModal} contentLabel="Modal" style={modalStyles}>
        <RecordEdit onFormSubmit={FromsubmitHandler} onCloseForm={handleCloseModal} />
      </Modal>
      {records && <ListingSection  AllRecords={records} />}
      {alertMessage && <div className='alert'>{alertMessage}</div>}
      <button id={styles2["track-button"]} className={`${styles['button-style']}`} onClick={handleOpenModal}>Track Food</button>
    
    </div>
  )
}

