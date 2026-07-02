import { useEffect, useState } from "react";

function Dashboard() {
  const [cabs, setCabs] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadCabs();
    loadBookings();
  }, []);

  const loadCabs = () => {
    // Since there's no backend database, we provide default mock cabs 
    // so your "Total Cabs" card matches the screenshot layout count of 4.
    const mockCabs = [
      { id: 1, cabName: "Sedan" },
      { id: 2, cabName: "SUV" },
      { id: 3, cabName: "Hatchback" },
      { id: 4, cabName: "Auto" }
    ];
    setCabs(mockCabs);
  };

  const loadBookings = () => {
    // Read the array directly from the browser's local memory 
    // that your Booking.jsx page creates when clicking "Book Now"
    const savedBookings = JSON.parse(localStorage.getItem("allBookings")) || [];
    setBookings(savedBookings);
  };

  const completedBookings = bookings.filter(b => b.status === "Completed").length;
  const cancelledBookings = bookings.filter(b => b.status === "Cancelled").length;

  return (
    <div style={{ padding: "30px" }}>
      <h2>Taxi Booking Dashboard</h2>

      <div style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap"
      }}>
        <div style={{ border: "1px solid gray", padding: "20px", width: "200px", background: "#f5f5f5" }}>
          <h3>Total Cabs</h3>
          <p>{cabs.length}</p>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px", width: "200px", background: "#f5f5f5" }}>
          <h3>Total Bookings</h3>
          <p>{bookings.length}</p>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px", width: "200px", background: "#f5f5f5" }}>
          <h3>Completed</h3>
          <p>{completedBookings}</p>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px", width: "200px", background: "#f5f5f5" }}>
          <h3>Cancelled</h3>
          <p>{cancelledBookings}</p>
        </div>
      </div>

      <h3 style={{ marginTop: "30px" }}>Recent Bookings</h3>

      <table border="1" width="100%" style={{ borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ background: "#eaeaea" }}>
            <th style={{ padding: "8px" }}>ID</th>
            <th style={{ padding: "8px" }}>Customer</th>
            <th style={{ padding: "8px" }}>Pickup</th>
            <th style={{ padding: "8px" }}>Drop</th>
            <th style={{ padding: "8px" }}>Cab</th>
            <th style={{ padding: "8px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ padding: "15px", textAlign: "center", color: "gray" }}>
                No active bookings. Head over to the 'Book Cab' page to submit a trip!
              </td>
            </tr>
          ) : (
            bookings.map((b, index) => (
              <tr key={b.id || index}>
                <td style={{ padding: "8px" }}>{index + 1}</td>
                <td style={{ padding: "8px" }}>{b.customerName}</td>
                <td style={{ padding: "8px" }}>{b.pickupLocation}</td>
                <td style={{ padding: "8px" }}>{b.dropLocation}</td>
                <td style={{ padding: "8px" }}>{b.cabType}</td>
                <td style={{ padding: "8px", fontWeight: "bold" }}>{b.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;