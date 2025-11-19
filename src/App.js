import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/login";
import Dashboard from "./pages/Dashboard";
import GenerateBill from "./pages/GenerateBill";
import Invoices from "./pages/Invoices";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate-bill" element={<GenerateBill />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
