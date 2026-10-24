import {createContext,useState} from "react";

export const AppContext = createContext({
    totalCalories: 0,
    setTotalCalories: () => {},
    currentDate: new Date(),
    setCurrentDate: () => {},
});

function AppContextProvider(props){
console.log("render: ListingSection", performance.now());    
const {children} = props;
const [currentDate,setCurrentDate] = useState(new Date());
const [totalCalories, setTotalCalories] = useState(0);
return <AppContext.Provider value={{currentDate, setCurrentDate, totalCalories, setTotalCalories}}>
       {children} 
      </AppContext.Provider>
 

}



export default AppContextProvider;

