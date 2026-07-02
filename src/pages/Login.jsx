import { useState } from "react";

function Login(){

const [user,setUser]=useState({email:"",password:""});

return(
<>
<h2>Login</h2>

<input type="email" placeholder="Enter Email"/>

<input type="password" placeholder="Enter Password"/>

<button>Login</button>

</>
)

}

export default Login;