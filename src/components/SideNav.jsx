import {NavLink} from "react-router-dom"
import styles from "./SideNav.module.css"
 function SideNav(){


return (
  <nav className={styles["sideNav"]}>
      <h1 className={styles["title"]}>Calorie Tracker</h1>
      <hr/>
      <NavLink to=""  end className={({isActive}) =>(isActive ? styles.active:undefined)} >Home</NavLink>
      <NavLink to="track"   className={({isActive}) =>(isActive ? styles.active:undefined)}>Track</NavLink>
  </nav>

)


}

export default SideNav;