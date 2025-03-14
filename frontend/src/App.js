import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import WeightTracker from "./weight";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeightTracker />} />
      </Routes>
    </Router>
  );
}

export default App;
