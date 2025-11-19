import Sidebar from "../component/Sidebar";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";   // <-- ADD THIS

export default function GenerateBill() {
  const [showSidebar, setShowSidebar] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [extraCharges, setExtraCharges] = useState("");
  const [discount, setDiscount] = useState("");
  const [finalTotal, setFinalTotal] = useState(0);
//   const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!customerName.trim()) newErrors.customerName = "Required";
    if (!phone.trim()) newErrors.phone = "Required";
    else if (phone.length !== 10) newErrors.phone = "10 digits required";

    if (!sessionType.trim()) newErrors.sessionType = "Required";
    if (!basePrice) newErrors.basePrice = "Required";

    if (basePrice < 0) newErrors.basePrice = "Invalid";
    if (extraCharges < 0) newErrors.extraCharges = "Invalid";
    if (discount < 0) newErrors.discount = "Invalid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    if (!validateForm()) return;

    const total =
      Number(basePrice || 0) +
      Number(extraCharges || 0) -
      Number(discount || 0);

    setFinalTotal(total);
  };

  const generateWhatsAppInvoice = () => {
    if (!validateForm()) return;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3);

    const message = `
📸 *PHOTOGRAPHY INVOICE*
────────────────────────
👤 Customer: ${customerName}
📞 Phone: ${phone}

📷 Session: ${sessionType}
💰 Base Price: ₹${basePrice}
➕ Extra Charges: ₹${extraCharges}
➖ Discount: ₹${discount}

🟩 *Total: ₹${finalTotal}*
🗓 Due Date: ${dueDate.toDateString()}
`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="d-flex">

      {/* Sidebar */}
      <Sidebar show={showSidebar} setShow={setShowSidebar} />

      {/* PAGE CONTENT */}
      <div className="container-fluid p-4">

        {/* HAMBURGER MENU — MOBILE ONLY */}
        <button
          className="btn btn-dark d-md-none"
          style={{
            position: "fixed",
            top: "15px",
            left: "15px",
            zIndex: 3001,
            borderRadius: "6px",
          }}
          onClick={() => setShowSidebar(true)}
        >
          <FiMenu size={24} />  {/* <-- ICON */}
        </button>

        <h2 className="fw-bold mb-4 mt-4">Generate Photography Invoice</h2>

        <div className="card p-4 shadow-lg border-0">

          {/* Customer Section */}
          <h5 className="fw-bold text-secondary mb-3">Customer Details</h5>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Full Name</label>
              <input
                className="form-control form-control-lg"
                onChange={(e) => setCustomerName(e.target.value)}
              />
              {errors.customerName && (
                <small className="text-danger">{errors.customerName}</small>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input
                className="form-control form-control-lg"
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <small className="text-danger">{errors.phone}</small>}
            </div>
          </div>

          {/* Session Section */}
          <h5 className="fw-bold text-secondary mt-4 mb-3">Session Details</h5>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Session Type</label>
              <select
                className="form-select form-select-lg"
                onChange={(e) => setSessionType(e.target.value)}
              >
                <option>Select Session</option>
                <option>Wedding Photoshoot</option>
                <option>Pre-Wedding Shoot</option>
                <option>Maternity Shoot</option>
                <option>Birthday Event</option>
                <option>Studio Shoot</option>
              </select>
              {errors.sessionType && (
                <small className="text-danger">{errors.sessionType}</small>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Base Price</label>
              <input
                type="number"
                className="form-control form-control-lg"
                onChange={(e) => setBasePrice(e.target.value)}
              />
              {errors.basePrice && (
                <small className="text-danger">{errors.basePrice}</small>
              )}
            </div>
          </div>

          {/* Extra Charges */}
          <h5 className="fw-bold text-secondary mt-4 mb-3">Billing Details</h5>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Extra Charges</label>
              <input
                type="number"
                className="form-control form-control-lg"
                onChange={(e) => setExtraCharges(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Discount</label>
              <input
                type="number"
                className="form-control form-control-lg"
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          </div>

          {/* Buttons */}
          <button
            className="btn btn-primary w-100 py-2 fs-5 mt-3"
            onClick={calculateTotal}
          >
            Calculate Total
          </button>

          {finalTotal > 0 && (
            <div className="alert alert-success text-center fs-4 fw-bold mt-3">
              Total: ₹{finalTotal}
            </div>
          )}

          <button
            onClick={generateWhatsAppInvoice}
            className="btn btn-success w-100 py-2 fs-5 mt-2"
          >
            Send via WhatsApp 📩
          </button>

        </div>
      </div>
    </div>
  );
}
