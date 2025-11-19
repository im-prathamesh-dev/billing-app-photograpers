import { useState } from "react";
import Sidebar from "../component/Sidebar";
import { FiMenu, FiUsers, FiDollarSign, FiClock, FiTrendingUp } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(false);

  const data = {
    totalCustomers: 120,
    uniqueCustomers: 95,
    totalCollected: 45000,
    pendingAmount: 8000,
    todaysCollection: 3500,
  };

  // Chart Data (Dummy – Replace with DB later)
  const monthlyData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Monthly Collection (₹)",
        data: [8000, 12000, 9000, 15000, 14000, 18000, 20000, 17000, 22000, 25000, 24000, 30000],
        borderColor: "#007bff",
        backgroundColor: "rgba(0,123,255,0.2)",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
      },
    ],
  };

  return (
    <div className="d-flex">

      {/* Sidebar */}
      <Sidebar show={showSidebar} setShow={setShowSidebar} />

      {/* Hamburger */}
      {!showSidebar && (
  <button
    className="btn btn-dark d-md-none"
    style={{
      position: "fixed",
      top: "43px",
      left: "15px",
      zIndex: 3001,
      borderRadius: "6px",
    }}
    onClick={() => setShowSidebar(true)}
  >
    <FiMenu size={22} />
  </button>
)}


      {/* Main Content */}
      <div className="container-fluid p-4 mt-4">

        <h2 className="fw-bold text-dark mb-3">📊 Dashboard</h2>

        {/* KPI Cards */}
        <div className="row g-3">

          {/* Unique */}
          <div className="col-6 col-md-3">
            <div
              className="text-white rounded shadow p-3 d-flex flex-column justify-content-between"
              style={{ background: "#007bff", height: "140px" }}
            >
              <div className="d-flex justify-content-between">
                <h6 className="fw-bold">Unique Customers</h6>
                <FiUsers size={24} />
              </div>
              <h3>{data.uniqueCustomers}</h3>
            </div>
          </div>

          {/* Collected */}
          <div className="col-6 col-md-3">
            <div
              className="text-white rounded shadow p-3 d-flex flex-column justify-content-between"
              style={{ background: "#28a745", height: "140px" }}
            >
              <div className="d-flex justify-content-between">
                <h6 className="fw-bold">Total Collected</h6>
                <FiDollarSign size={24} />
              </div>
              <h3>₹ {data.totalCollected}</h3>
            </div>
          </div>

          {/* Pending */}
          <div className="col-6 col-md-3">
            <div
              className="text-white rounded shadow p-3 d-flex flex-column justify-content-between"
              style={{ background: "#dc3545", height: "140px" }}
            >
              <div className="d-flex justify-content-between">
                <h6 className="fw-bold">Pending</h6>
                <FiClock size={24} />
              </div>
              <h3>₹ {data.pendingAmount}</h3>
            </div>
          </div>

          {/* Today */}
          <div className="col-6 col-md-3">
            <div
              className="text-white rounded shadow p-3 d-flex flex-column justify-content-between"
              style={{ background: "#17a2b8", height: "140px" }}
            >
              <div className="d-flex justify-content-between">
                <h6 className="fw-bold">Today’s Collection</h6>
                <FiTrendingUp size={24} />
              </div>
              <h3>₹ {data.todaysCollection}</h3>
            </div>
          </div>

        </div>

        {/* Chart Section */}
        <div className="card p-4 shadow-lg mt-4">
          <h4 className="fw-bold mb-3">📈 Monthly Revenue Overview</h4>
          <Line data={monthlyData} height={90} />
        </div>

      </div>
    </div>
  );
}
