import axios from "axios";
import { useEffect, useState } from "react";

function Booking() {
  const [cabs, setCabs] = useState([]);
  const [booking, setBooking] = useState({
    customerName: "",
    phone: "",
    pickupLocation: "",
    dropLocation: "",
    cabId: "",
    cabType: ""
  });

  const [msg, setMsg] = useState("");

  const CAB_URL = "http://localhost:3000/cabs";
  const BOOKING_URL = "http://localhost:3000/bookings";

  // 1. Automatically fetch live cabs from db.json when page loads
  useEffect(() => {
    axios.get(CAB_URL)
      .then((res) => setCabs(res.data))
      .catch((err) => console.log("Error loading cabs:", err));
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
  };

  // 2. Send the filled data straight to json-server database
  const bookCab = (cab) => {
    if (!booking.customerName || !booking.pickupLocation || !booking.dropLocation) {
      setMsg("Please fill out your details before booking a cab!");
      return;
    }

    const newBooking = {
      ...booking,
      cabId: cab.id,
      cabType: cab.cabName,
      driverName: cab.driverName,
      status: "Booked" // Saved as 'Booked' so it registers on your dashboard metrics
    };

    // This makes the live write to db.json
    axios.post(BOOKING_URL, newBooking)
      .then((res) => {
        setMsg(`Cab "${cab.cabName}" booked successfully!`);
        // Reset form inputs
        setBooking({
          customerName: "",
          phone: "",
          pickupLocation: "",
          dropLocation: "",
          cabId: "",
          cabType: ""
        });
      })
      .catch((err) => {
        console.log("Error creating booking:", err);
        setMsg("Failed to book cab. Is json-server running?");
      });
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2>Book a Cab</h2>

      <input
        type="text"
        name="customerName"
        placeholder="Enter Your Name"
        value={booking.customerName}
        onChange={handleInput}
      />
      <br />
      <br />

      <input
        type="text"
        name="phone"
        placeholder="Enter Phone Number"
        value={booking.phone}
        onChange={handleInput}
      />
      <br />
      <br />

      <input
        type="text"
        name="pickupLocation"
        placeholder="Pickup Location"
        value={booking.pickupLocation}
        onChange={handleInput}
      />
      <br />
      <br />

      <input
        type="text"
        name="dropLocation"
        placeholder="Drop Location"
        value={booking.dropLocation}
        onChange={handleInput}
      />

      <h3>Available Cabs</h3>

      <div>
        {cabs.map((cab) => (
          <div
            key={cab.id}
            style={{
              border: "1px solid gray",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "5px",
              background: "#fafafa"
            }}
          >
            <h4>{cab.cabName}</h4>
            <p>Driver : {cab.driverName}</p>
            <p>Fare/km : ₹{cab.farePerKm}</p>
            <p>Seats : {cab.seats}</p>
            <button onClick={() => bookCab(cab)}>Book Now</button>
          </div>
        ))}
      </div>

      <p style={{ color: msg.includes("successfully") ? "green" : "red", fontWeight: "bold" }}>{msg}</p>
    </div>
  );
}

export default Booking;