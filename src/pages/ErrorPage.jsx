import { useEffect, useState,useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom"
const COUNTDOWN_INTERVAL = 1000;
const HOME_LINK = "/";
const REDIRECT_COUNT = 10;
export function ErrorPage() {
    const [counter, setCounter] = useState(REDIRECT_COUNT);
    const IntervalHandler = useRef();
    const NevigateToHome = useNavigate();
    /**كل مرة هيحط بداية للفترة محتلفة مش هيكون ثابت وبالتالي الحل بحيث إن كل render يكون مستقر 
     * هنستخدم useEffect
     */
    if (counter === 0) {
        clearInterval(IntervalHandler.current);
        NevigateToHome(HOME_LINK)
    }

    useEffect(() => {
        /**
         * لكل مؤقت له معامل له رقم خاص هذا الرقم ممكن يتم إغلائه
         *  */
        IntervalHandler.current = setInterval(() => {
            setCounter((prev) => prev - 1);
        }, COUNTDOWN_INTERVAL);
        return () => {
            clearInterval(IntervalHandler.current);
        }
    }, []);
    return (
        <>
            <h1>Something goes wrong...</h1>
            <p>Redirecting to Home Page {counter}.</p>
            <p>Please Enter---<Link to={HOME_LINK}> Home Page</Link> ---to go back</p>
        </>
    )
}