import { Link } from "react-router-dom";

function Header() {

const headerStyle={
backgroundColor:"orange",
color:"white",
padding:"15px"
}

const navStyle={
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}

const menuStyle={
display:"flex",
gap:"20px"
}

const linkStyle={
color:"white",
textDecoration:"none",
fontWeight:"bold"
}

return(

<header style={headerStyle}>

<div style={navStyle}>

{/* Logo / Title */}
<h2>TaxiApp</h2>

{/* Navigation Menu */}
<nav style={menuStyle}>

<Link style={linkStyle} to="/">Home</Link>

<Link style={linkStyle} to="/booking">Book Cab</Link>

<Link style={linkStyle} to="/about">About Us</Link>

<Link style={linkStyle} to="/contact">Contact Us</Link>

<Link style={linkStyle} to="/login">Login</Link>

</nav>

</div>

</header>

)

}

export default Header;