import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/login";
import Dashboard from "./pages/Dashboard";
import GenerateBill from "./pages/GenerateBill";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate-bill" element={<GenerateBill />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
