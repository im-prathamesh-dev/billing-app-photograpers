import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiFileText, FiUsers, FiLogOut } from "react-icons/fi";
import "./sidebar.css";

export default function Sidebar({ show, setShow }) {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Guest User",
    email: "guest@example.com",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* BACKDROP */}
      {show && (
        <div
          className="sidebar-backdrop d-md-none"
          onClick={() => setShow(false)}
        ></div>
      )}

      <div
        className={`sidebar bg-dark text-white p-3 d-flex flex-column 
        ${show ? "sidebar-show" : ""}`}
        style={{ borderTopRightRadius: "12px", borderBottomRightRadius: "12px" }}
      >

        {/* Logo / Title */}
        <div className="text-center mb-4">
          <h4 className="fw-bold mb-0">📸 Billing App</h4>
          <small className="text-white-50">Photographers Panel</small>
        </div>

        {/* NAVIGATION */}
        <ul className="nav flex-column mb-auto">

          <li className="nav-item mb-2">
            <Link
              to="/dashboard"
              className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded 
              ${isActive("/dashboard") ? "active-link" : "text-white"}`}
              onClick={() => setShow(false)}
            >
              <FiHome size={20} />
              Dashboard
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              to="/generate-bill"
              className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded 
              ${isActive("/generate-bill") ? "active-link" : "text-white"}`}
              onClick={() => setShow(false)}
            >
              <FiFileText size={20} />
              Generate Bill
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              to="/customers"
              className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded 
              ${isActive("/customers") ? "active-link" : "text-white"}`}
              onClick={() => setShow(false)}
            >
              <FiUsers size={20} />
              Customers
            </Link>
          </li>
        </ul>

        {/* USER INFO (bottom) */}
        <div className="mt-auto p-3 border-top border-secondary small">
          <div className="fw-bold">{user.name}</div>
          <div className="text-white-50">{user.email}</div>

          <button
            className="btn btn-outline-light btn-sm w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
            onClick={handleLogout}
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>

      </div>
    </>
  );
}
