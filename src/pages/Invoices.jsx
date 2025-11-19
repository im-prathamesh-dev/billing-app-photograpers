import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import { FiMenu, FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import axios from "axios";


export default function Invoices() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all invoices
  const fetchInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/invoices",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setInvoices(res.data);
      console.log("API RESPONSE:", res.data)
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Delete invoice
  const deleteInvoice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/invoices/${id}`);
      setInvoices(invoices.filter((inv) => inv._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // Change payment status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/invoices/status/${id}`, {
        paymentStatus: newStatus,
      });

      setInvoices(
        invoices.map((inv) =>
          inv._id === id ? { ...inv, paymentStatus: newStatus } : inv
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex">

      <Sidebar show={showSidebar} setShow={setShowSidebar} />

      {/* MOBILE MENU BUTTON */}
      {!showSidebar && (
        <button
          className="btn btn-dark d-md-none"
          style={{
            position: "fixed",
            top: "15px",
            left: "15px",
            zIndex: 3001,
          }}
          onClick={() => setShowSidebar(true)}
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* PAGE CONTENT */}
      <div className="container-fluid p-4 mt-4">
        <h2 className="fw-bold mb-4 mt-4">📄 All Invoices</h2>

        {/* LOADING */}
        {loading && <p>Loading invoices...</p>}

        {/* INVOICE TABLE */}
        {!loading && (
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Invoice ID</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Issue Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv._id}>
                    <td className="fw-bold">{inv.invoiceId}</td>
                    <td>{inv.customer?.name}</td>
                    <td>{inv.customer?.phone}</td>
                    <td>₹ {inv.total}</td>

                    {/* STATUS BADGE */}
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={inv.paymentStatus}
                        onChange={(e) =>
                          updateStatus(inv._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Partial">Partial</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </td>

                    <td>{new Date(inv.issueDate).toLocaleDateString()}</td>

                    {/* ACTION BUTTONS */}
                    <td className="d-flex gap-2">

                      {/* View Invoice */}
                      <button className="btn btn-sm btn-info">
                        <FiEye />
                      </button>

                      {/* Edit Invoice */}
                      <button className="btn btn-sm btn-warning">
                        <FiEdit />
                      </button>

                      {/* Delete */}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteInvoice(inv._id)}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}
