import { useState } from "react";

function ContactUs(){

const [contact,setContact]=useState({
name:"",
email:"",
message:""
});

const [msg,setMsg]=useState("");

const containerStyle={
maxWidth:"800px",
margin:"auto",
padding:"30px"
};

const inputStyle={
width:"100%",
padding:"10px",
margin:"10px 0"
};

const buttonStyle={
padding:"10px 20px",
backgroundColor:"#1e90ff",
color:"white",
border:"none",
cursor:"pointer"
};

const handleInput=(e)=>{
const {name,value}=e.target;
setContact({...contact,[name]:value});
};

const handleSubmit=(e)=>{
e.preventDefault();
setMsg("Your message has been submitted successfully!");
setContact({name:"",email:"",message:""});
};

return(

<div style={containerStyle}>

<h2>Contact Us</h2>

<p>If you have any questions or need help with booking a taxi, please contact us.</p>

<form onSubmit={handleSubmit}>

<input
type="text"
name="name"
placeholder="Enter Your Name"
value={contact.name}
onChange={handleInput}
style={inputStyle}
/>

<input
type="email"
name="email"
placeholder="Enter Your Email"
value={contact.email}
onChange={handleInput}
style={inputStyle}
/>

<textarea
name="message"
placeholder="Enter Your Message"
value={contact.message}
onChange={handleInput}
style={inputStyle}
/>

<button type="submit" style={buttonStyle}>Send Message</button>

</form>

<p style={{color:"green"}}>{msg}</p>

<hr/>

<h3>Our Office</h3>

<p>Email : support@taxiapp.com</p>
<p>Phone : +91 9876543210</p>
<p>Address : Bangalore, India</p>

</div>

)

}

export default ContactUs;