import Sidebar from "../component/Sidebar";
import { useState } from "react";
import { FiMenu, FiPlus, FiTrash } from "react-icons/fi";
import axios from "axios";

export default function GenerateBill() {
  const [showSidebar, setShowSidebar] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [projectType, setProjectType] = useState("");

  const [items, setItems] = useState([
    { title: "", description: "", qty: 1, rate: 0, amount: 0 },
  ]);

  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [notes, setNotes] = useState("");

  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const [errors, setErrors] = useState({});

  // ------------------------------
  // VALIDATION
  // ------------------------------
  const validate = () => {
    const err = {};

    if (!customer.name.trim()) err.name = "Customer name required";
    if (!customer.phone.trim() || customer.phone.length !== 10)
      err.phone = "Valid phone required";

    if (!projectType) err.projectType = "Select project type";
    if (items.some((i) => !i.title.trim())) err.items = "Item title required";
    if (!issueDate) err.issueDate = "Issue date required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ------------------------------
  // ITEM HANDLERS
  // ------------------------------
  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    newItems[index].amount =
      newItems[index].qty * newItems[index].rate || 0;

    setItems(newItems);
    recalcTotals(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { title: "", description: "", qty: 1, rate: 0, amount: 0 },
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    recalcTotals(newItems);
  };

  // ------------------------------
  // TOTAL CALCULATION
  // ------------------------------
  const recalcTotals = (updatedItems = items) => {
    const st = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = st * (tax / 100);
    const totalAmount = st + taxAmount - discount;

    setSubTotal(st);
    setTotal(totalAmount);
  };

  // ------------------------------
  // SUBMIT INVOICE TO BACKEND
  // ------------------------------
  const saveInvoice = async () => {
    if (!validate()) return;

    try {
      const payload = {
        customer,
        projectType,
        items,
        subTotal,
        tax,
        discount,
        total,
        paidAmount,
        issueDate,
        dueDate,
        notes,
        createdBy: "USER_ID", // replace with logged user id later
      };

      const res = await axios.post("http://localhost:5000/api/invoices/create", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });

      alert("Invoice created successfully!");
      console.log(res.data);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Error saving invoice");
      console.log(err);
    }
  };

  return (
    <div className="d-flex">

      <Sidebar show={showSidebar} setShow={setShowSidebar} />

      {/* PAGE CONTENT */}
      <div className="container-fluid p-4">

        {/* Hamburger */}
        {!showSidebar && (
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
            <FiMenu size={24} />
          </button>
        )}

        <h2 className="fw-bold mb-4 mt-4">Create Invoice</h2>

        <div className="card p-4 shadow-lg border-0">

          {/* CUSTOMER SECTION */}
          <h5 className="fw-bold text-secondary mb-3">Customer Details</h5>

          <div className="row g-3">
            {["name", "email", "phone", "address"].map((field) => (
              <div className="col-md-6" key={field}>
                <label className="form-label text-capitalize">{field}</label>
                <input
                  className="form-control form-control-lg"
                  onChange={(e) =>
                    setCustomer({ ...customer, [field]: e.target.value })
                  }
                />
                {errors[field] && (
                  <small className="text-danger">{errors[field]}</small>
                )}
              </div>
            ))}
          </div>

          {/* PROJECT TYPE */}
          <h5 className="fw-bold text-secondary mt-4 mb-3">Project Type</h5>

          <select
            className="form-select form-select-lg"
            onChange={(e) => setProjectType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option>Photography</option>
            <option>Cinematography</option>
            <option>Editing</option>
          </select>
          {errors.projectType && (
            <small className="text-danger">{errors.projectType}</small>
          )}

          {/* ITEMS SECTION */}
          <h5 className="fw-bold text-secondary mt-4 mb-3">
            Invoice Items
          </h5>

          {items.map((item, index) => (
            <div className="row g-3 border rounded p-3 mb-3" key={index}>

              <div className="col-md-4">
                <label className="form-label">Title</label>
                <input
                  className="form-control"
                  value={item.title}
                  onChange={(e) => updateItem(index, "title", e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Description</label>
                <input
                  className="form-control"
                  value={item.description}
                  onChange={(e) =>
                    updateItem(index, "description", e.target.value)
                  }
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Qty</label>
                <input
                  type="number"
                  className="form-control"
                  value={item.qty}
                  onChange={(e) => updateItem(index, "qty", e.target.value)}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Rate</label>
                <input
                  type="number"
                  className="form-control"
                  value={item.rate}
                  onChange={(e) => updateItem(index, "rate", e.target.value)}
                />
              </div>

              <div className="col-md-12 mt-2 d-flex justify-content-between">
                <strong>Amount: ₹{item.amount}</strong>

                {index > 0 && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(index)}
                  >
                    <FiTrash />
                  </button>
                )}
              </div>
            </div>
          ))}

          <button className="btn btn-outline-primary mb-4" onClick={addItem}>
            <FiPlus /> Add Item
          </button>

          {/* TAX + DISCOUNT */}
          <div className="row g-3 mt-3">
            <div className="col-md-4">
              <label className="form-label">Tax (%)</label>
              <input
                type="number"
                className="form-control"
                value={tax}
                onChange={(e) => {
                  setTax(e.target.value);
                  recalcTotals();
                }}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Discount (₹)</label>
              <input
                type="number"
                className="form-control"
                value={discount}
                onChange={(e) => {
                  setDiscount(e.target.value);
                  recalcTotals();
                }}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Paid Amount</label>
              <input
                type="number"
                className="form-control"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
              />
            </div>
          </div>

          {/* DATES */}
          <div className="row g-3 mt-3">
            <div className="col-md-6">
              <label className="form-label">Issue Date</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          {/* NOTES */}
          <div className="mt-3">
            <label className="form-label">Notes</label>
            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          {/* TOTAL SECTION */}
          <div className="mt-4 p-3 bg-light rounded">
            <h5>Summary</h5>
            <p className="mb-1">Subtotal: ₹{subTotal}</p>
            <p className="mb-1">Tax: {tax}%</p>
            <p className="mb-1">Discount: ₹{discount}</p>
            <h4 className="fw-bold">Total: ₹{total}</h4>
          </div>

          {/* SAVE BUTTON */}
          <button
            className="btn btn-primary w-100 py-2 fs-5 mt-3"
            onClick={saveInvoice}
          >
            Save Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
