import axios from "axios";
import { useEffect, useState } from "react";
import { getBookings } from "../services/bookingService";

function Home() {
  const [cabs, setCabs] = useState([]);
  const [bookings, setBookings] = useState([]);

  const CAB_URL = "http://localhost:3000/cabs";

  useEffect(() => {
    loadCabs();
    loadBookings();
  }, []);

  const loadCabs = async () => {
    try {
      let res = await axios.get(CAB_URL);
      setCabs(res.data);
    } catch (error) {
      console.log("Error loading cabs:", error.message);
    }
  };

  const loadBookings = async () => {
    try {
      let res = await getBookings();
      // Safely check if res exists and has a data property
      if (res && res.data) {
        setBookings(res.data);
      }
    } catch (error) {
      console.log("Error loading bookings:", error.message);
    }
  };

  const completedBookings = bookings.filter(b => b.status === "Completed").length;
  const cancelledBookings = bookings.filter(b => b.status === "Cancelled").length;

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Taxi Booking Dashboard</h3>

      {/* COUNTER CARDS */}
      <div style={{
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: "30px"
      }}>
        <div style={cardStyle}>
          <h3 style={cardHeaderStyle}>Total Cabs</h3>
          <p style={cardNumStyle}>{cabs.length}</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardHeaderStyle}>Total Bookings</h3>
          <p style={cardNumStyle}>{bookings.length}</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardHeaderStyle}>Completed</h3>
          <p style={cardNumStyle}>{completedBookings}</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardHeaderStyle}>Cancelled</h3>
          <p style={cardNumStyle}>{cancelledBookings}</p>
        </div>
      </div>

      {/* RECENT BOOKINGS TABLE */}
      <h3 style={{ marginTop: "30px", textAlign: "center" }}>Recent Bookings</h3>

      <table border="1" width="100%" style={{ borderCollapse: "collapse", textAlign: "center", marginTop: "10px" }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ padding: "10px" }}>ID</th>
            <th style={{ padding: "10px" }}>Customer</th>
            <th style={{ padding: "10px" }}>Pickup</th>
            <th style={{ padding: "10px" }}>Drop</th>
            <th style={{ padding: "10px" }}>Cab</th>
            <th style={{ padding: "10px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ padding: "20px", color: "gray" }}>
                No recent bookings found. Go to the "Book Cab" tab to create one!
              </td>
            </tr>
          ) : (
            bookings.map((b, index) => (
              <tr key={b.id || index}>
                <td style={{ padding: "10px" }}>{index + 1}</td>
                <td style={{ padding: "10px" }}>{b.customerName}</td>
                <td style={{ padding: "10px" }}>{b.pickupLocation}</td>
                <td style={{ padding: "10px" }}>{b.dropLocation}</td>
                <td style={{ padding: "10px" }}>{b.cabType || b.cabName}</td>
                <td style={{ padding: "10px", fontWeight: "bold", color: b.status === "Completed" ? "green" : "blue" }}>
                  {b.status}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Styles matching the screenshot structure
const cardStyle = {
  border: "1px solid #ccc",
  padding: "20px",
  width: "200px",
  textAlign: "center",
  background: "#f5f5f5",
  borderRadius: "4px"
};

const cardHeaderStyle = {
  margin: "0 0 15px 0",
  fontSize: "18px",
  color: "#555"
};

const cardNumStyle = {
  margin: "0",
  fontSize: "22px",
  fontWeight: "bold"
};

export default Home;