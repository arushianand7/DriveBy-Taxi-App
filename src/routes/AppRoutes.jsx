import { BrowserRouter,Routes,Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Booking from "../pages/Booking";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";

function AppRoutes(){

return(



<Routes>

<Route path="/" element={<Home/>}/>

<Route path="/login" element={<Login/>}/>

<Route path="/booking" element={<Booking/>}/>

<Route path="/about" element={<AboutUs/>}/>

<Route path="/contact" element={<ContactUs/>}/>

</Routes>



)

}

export default AppRoutes;