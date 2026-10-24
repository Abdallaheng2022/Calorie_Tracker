import RecordList from "./RecordList";
import styles from "./ListingSection.module.css"
import { useEffect, useState,useContext } from "react";
import {AppContext} from "./AppContext";

function ListingSection(props) {
    console.log("render: ListingSection", performance.now());
    const { AllRecords } = props;
    /**نحن نريد أن ننقي بالتاريخ */
    
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [user, setUser] = useState({}); /**لما بتعمل fetch، بتبعت طلب لسيرفر على الإنترنت، والرد ممكن ياخد نص ثانية أو أكتر. 
    JavaScript مش بيستنى. بيكمل تنفيذ باقي الكود على طول، وبدل الداتا بيرجعلك حاجة اسمها Promise， يعني وعد إن الداتا هتيجي بعدين. */
    const { totalCalories, setTotalCalories, currentDate, setCurrentDate } = useContext(AppContext);
    const onDateChangeHandler = (event) => {
          
          setCurrentDate(new Date(event.target.value));
        
    }
    const dateFliter = (record)=>{
       return record.date.getDate() === currentDate.getDate()
              &&record.date.getMonth() === currentDate.getMonth() 
              &&record.date.getFullYear() === currentDate.getFullYear()

    }
    const getUser = async () =>{
         console.log("Making a new HTTP request");
         const response = await fetch("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole");
         console.log(response)
         const data = await response.json()
        
         setUser({
           firstName: data.at(0).first,
           lastName: data.at(0).last,
           email: data.at(0).email

         });
    };

    useEffect(()=>{
       getUser();

    },[]);
   /**
    * فهم المشكلة تخيل ان مستخدم بغير التاريخ ثم بيروح يغير التاريخ تاني بسرعة قبل ما يخلص تحميل البيانات من السيرفر هنا الإستفاد من useEffect انك تحط الدالة اللي بتعمل الفيتش في useEffect بحيث كل مرة المستخدم يغير التاريخ هيتم عمل الفيتش تاني
    * وانه ينضف البيانات اللي جت من الفيتش في الstate بحيث كل مرة المستخدم يغير التاريخ هيتم عمل الفيتش تاني
    * useEffect -- manages side effects in functional components. It allows you to perform actions like data fetching, subscriptions, or manually changing the DOM in response to state or prop changes.
    * simulate that by setTimeout function to delay the execution of the fetch request. This will give you a chance to change the date before the fetch request is made.
    */
    useEffect(()=>{
        /*Simulate delay 5 seconds */
       const timeoutId = setTimeout(()=>{
             console.log("Data loaded");
              setFilteredRecords(AllRecords.filter(dateFliter));
              
        },5000)
        /** Clean up function for timeoutId means cancel the timeout to allow to another date change appear */
        return () => {
            console.log("old loading data cleared"); 
            clearTimeout(timeoutId);
            
        };
    },[currentDate]);

    return <>
        <div className={styles["date-picker"]}>
            <label className={styles["label-date-picker"]} htmlFor="listingDate">Select Date:</label>
            <input type="date" id="listingDate" className={styles["input-date-picker"]} value={currentDate.toISOString().split("T")[0]} onChange={onDateChangeHandler} />
        </div>
        <RecordList records={filteredRecords} />
        <div>
            <p>{user.email}</p>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>

        </div>
    </>



}
export default ListingSection;