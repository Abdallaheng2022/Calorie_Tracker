import styles from "./App.module.css"
import { LandingPage, TrackPage, PageLayout, ErrorPage,DetailPage} from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([

  {
    path: "/",
    element: <PageLayout />,
    errorElement:<ErrorPage />,
    children:[
      {
        path: "",/**Alterative index:true */
        element: <LandingPage />
      },
      {
        path: "track",
        element: <TrackPage />

      },
       {
        path: "track/:recordId",
        element:<DetailPage/>

      }
    
    ]
  },


]);

function App() {

  return <RouterProvider router={router} />

}

export default App;