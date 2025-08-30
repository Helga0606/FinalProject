import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ActivityDetail from "./pages/ActivityDetail";
import Cart from "./pages/Cart";
import Transactions from "./pages/Transactions";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activity/:id" element={<ActivityDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
