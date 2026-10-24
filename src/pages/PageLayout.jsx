import styles from "./PageLayout.module.css"
import SideNav from "../components/SideNav"
import { Outlet } from "react-router-dom";
import  AppContextProvider  from "../components/AppContext";
export function PageLayout(){

return(
<AppContextProvider>
<div className={styles["layout"]}>
        <SideNav/>

        <div className={styles["component-wrapper"]}>
           <Outlet/>

        </div>
        </div>
 </AppContextProvider>       
    );


}