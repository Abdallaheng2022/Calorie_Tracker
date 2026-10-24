
import {AppContext} from "./AppContext";
import styles from "./RecordEdit.module.css"
import Button from "./Button";

import { useEffect, useState, useReducer,useContext, useRef, useCallback } from "react";
const DEFAULT_VALUES = {
    date:  false ,
    mealtype: false ,
    content: false ,
    calories: false }

/** useRef is reference to control the react dom of the components which contain ref property  */
function formReducer(state, action) {
    const {key,value, auXvalue } = action;
    let valid;
    switch (key) {
        case "content":
            valid = ((auXvalue < 0 && value === "sport") ||
                (auXvalue >= 0 && value !== "sport"));

            return { ...state, 
                content:!!value /** لو كانت فاضية هيطلع خطأ ولو كان مليانة هيطلع صح */ , 
                calories:valid} 
                    
            
        case "calories":
            valid = ((value < 0 && auXvalue === "sport") ||
                (value >= 0 && auXvalue !== "sport"));
            return { ...state, 
                calories: valid }
                          
            
        default:
            return {
            ...state,
            mealtype: !!value /** لو كانت فاضية هيطلع خطأ ولو كان مليانة هيطلع صح */ }
        
    }

       
    }
   

function RecordEdit(props) {

    /**
     * 
     * 
     * فكرة تغيير قيم خاصية الvalue في الinput عن طريق دالة setState 
     * هذه تحول المكون من مكون غير متحكم فيه إلى مكون متحكم فيه
     * لو لم أقم بوضع قيمة ابتدائية للتاريخ في الأول سيعتبره غير متحكم فيه ثم بمجرد اختيار التاريخ مع تغيير خاصية القيمة يتحول إلى متحكم فيه
     *  فالريأكت يظهر تحذير أنت تريده متحكم فيه أو غير متحكم فيه لا يمكن أن يكون الاثنين معا
     *preventDefault() هذه الدالة تمنع إعادة تحميل الصفحة عند الضغط على زر الإرسال
     OnSubmit in form tag هذه الخاصية تجعل الدالة OnSubmitHandler تعمل عند الضغط على زر الإرسال
     * value means the current value of the input field
      when writing the value of the input field we are making it a controlled component
      when we assign a value it prevents the user from changing the value of the input field
      so the solution is to use the submit event to update the value of the input field and make it a controlled component
     */
    const mealRef = useRef();
    const contentRef = useRef();
    const caloriesRef = useRef();

    const {currentDate, setCurrentDate, totalCalories}=useContext(AppContext);
    const [formState, dispatchfn] = useReducer(formReducer, DEFAULT_VALUES, initialState => ({
      ...initialState, date:!!currentDate }));
    /***     
     * the use Reducer hook is used to manage the state of a component in a more predictable way. It is similar to the useState hook, but it allows you to manage complex state 
     * logic by using a reducer function. The reducer function takes the current state and an action as arguments and returns a new state based on the action type.
     *  This allows you to handle multiple state transitions in a single place, making it easier to manage complex state logic.
     * As an example, we can use the useReducer hook to manage the state of a form with multiple input fields. 
     * We can define a reducer function that handles the state transitions for each input field based on the action type. This allows us to manage 
     * the state of the form in a more predictable way, making it easier to handle complex form logic.
     */
    const [IsValid, setIsValid] = useState(false);


    /**ممكن نحط ال setValid قبل عمل تأكيد على الفورمة لكن هذا ليس الهدف من استخدام الstate 
     *  لذلك في بعض الhooks 
     * اللي أنشأؤها للتأكد من هل الحفول في حالة أن تملأ أم أنها غير ذلك
     * في كل الأحوال بشكل مستمر ولكن بشرط أن المتغيرات التي تأتي من ملأ الحقول فيها قيم صحيحة لكن لو لم نضع شرط سيتم تنفيذ شرط لو وضع قائمة اعتمادات فارغة
     * في قائمة الإعتمادات أو الشروط ضع الشروط التي تتغير أي شيء لا يتغير لا نضعه
     * فبتالي مينفعش تضع دوال
     */

    
    const { date: isDateValid ,mealtype: isMealTypeValid, content:  isContentValid , calories: isCaloriesValid }  = formState;
    useEffect(() => {
        if(!isContentValid){
              contentRef.current.focus();

        }
        console.log(isDateValid && isMealTypeValid && isContentValid && isCaloriesValid);
        setIsValid(isDateValid && isMealTypeValid && isContentValid && isCaloriesValid)


    }, [isDateValid, isMealTypeValid, isContentValid, isCaloriesValid]);
    const OnSubmitHandler = (event) => {

        event.preventDefault();
        const { name, value } = event.target;
        dispatchfn({ key: name, value: value });
        const id = crypto.randomUUID()
        props.onFormSubmit({id: id,
                            date:currentDate,
                            mealtype: mealRef.current.value,
                            content: contentRef.current.value,
                            calories: Number(caloriesRef.current.value)
        });

    }
    const OnDateChangeHandler = (event) => {
         const { name, value } = event.target;
        dispatchfn({key: name, value: value});
        setCurrentDate(new Date(value));
    }

    const OnMealTypeBlurHandler = (event) => {
        const { name, value } = event.target;
        dispatchfn({key: name, value: value, auXvalue:mealRef.current.value });
       
    }
    const OnCaloriesBlurHandler = (event) => {
        const { name, value } = event.target;
        dispatchfn({ key: name, value: value ,auXvalue:contentRef.current.value });
    }
    const OnContentBlurHandler = (event) => {
        const { name, value } = event.target;
        dispatchfn({  key: name, value: value,auXvalue:Number(caloriesRef.current.value) });

    }
    const OnCancelHandler = useCallback(()=>{
         event.preventDefault();
        if (IsValid){
        props.onCloseForm();}

    });

    /*** UseReducers 
     * Validaty state depends on multiple state values, so we can use useReducer to manage the state and the validity of the form. As an examples:
     * sport is content when calories is negaive is valid but in the other hand if calories is positive and content is empty is invalid
     * when the content is others and calories is negative is invalid based on that, two state values are dependent each other. In more detailm,
     * when the content is others and calories is postive is invalid  because the setFunction of calories excuted befotr the setFunction of content so the content is beard or others and the calories is positive so the form is invalid 
     * so the solution is to use useReducer to manage the state and the validity of the form. or make the setFunction of calories excuted after the setFunction of content so the content is others and the calories is positive so the form is invalid
     * how to do that ? we can use useEffect to manage the validity of the form based on the state values.
     * write the code 
     */
    return (
        <>
        <div className={styles['warning']}>The total calories are {totalCalories} calories.</div>
        <form onSubmit={OnSubmitHandler}>
            
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" value={currentDate.toISOString().split("T")[0]}  className={!isDateValid ? styles['error'] : ''} onChange={OnDateChangeHandler} />
            <label htmlFor="mealtype">Meal Type:</label>
            <select id="mealtype" name="mealtype" ref={mealRef} className={!isMealTypeValid ? styles['error'] : ''} onBlur={OnMealTypeBlurHandler}>
                <option value=""></option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
            </select>
            <label htmlFor="content">Content:</label>
            <input type="text" id="content" name="content" ref={contentRef} onChange={OnContentBlurHandler} className={!isContentValid ? styles['error'] : ''} />
            <label htmlFor="calories">Calories:</label>
            <input type="number" id="calories"
                name="calories" 
                onChange={OnCaloriesBlurHandler}
                ref={caloriesRef}
                className={!isCaloriesValid ? styles['error'] : ''} />
            <Button type="submit" className={styles['button-style']} disabled={!IsValid}>Add Record</Button>
            <Button type="button" className={styles['button-style']} onClick={OnCancelHandler}>Cancel</Button>
        </form>
        </>
    )
}


export default RecordEdit;