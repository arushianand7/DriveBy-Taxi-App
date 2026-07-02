import axios from "axios";
import { useEffect, useState } from "react";

function MyBookings(){

const [bookings,setBookings]=useState([]);
const [msg,setMsg]=useState("");

const BOOKING_URL="http://localhost:3000/bookings";


const loadBookings=async()=>{

try{

let res=await axios.get(BOOKING_URL);

setBookings(res.data);

}catch(error){

console.log(error.message);

}

};


const cancelBooking=async(id)=>{

try{

await axios.delete(`${BOOKING_URL}/${id}`);

setMsg("Booking cancelled successfully");

loadBookings();

}catch(error){

console.log(error.message);

}

};


useEffect(()=>{

loadBookings();

},[]);


return(

<div style={{padding:"30px"}}>

<h2>My Bookings</h2>

<p style={{color:"green"}}>{msg}</p>

<table border="1" width="100%">

<thead>

<tr>

<th>ID</th>

<th>Customer</th>

<th>Pickup</th>

<th>Drop</th>

<th>Cab</th>

<th>Driver</th>

<th>Status</th>

<th>Cancel</th>

</tr>

</thead>

<tbody>

{bookings.map(b=>

<tr key={b.id}>

<td>{b.id}</td>

<td>{b.customerName}</td>

<td>{b.pickupLocation}</td>

<td>{b.dropLocation}</td>

<td>{b.cabType}</td>

<td>{b.driverName}</td>

<td>{b.status}</td>

<td>

<button onClick={()=>cancelBooking(b.id)}>
Cancel
</button>

</td>

</tr>

)}

</tbody>

</table>

</div>

)

}

export default MyBookings;