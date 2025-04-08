import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login"; // Adjust the path if needed
import "./App.css";
import VendorRegister from "./pages/VendorRegistration";
import TravelerRegister from "./pages/TravelerRegistration";
import RegisterChoice from "./pages/Register"; // Adjust the path if needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterChoice />} />
        <Route path="/register/vendor" element={<VendorRegister />} />
        <Route path="/register/traveler" element={<TravelerRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
