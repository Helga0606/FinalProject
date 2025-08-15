import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ActivityDetail from "./pages/ActivityDetail";
import Cart from "./pages/Cart";
import Transactions from "./pages/Transactions";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activity/:id" element={<ActivityDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  );
}
