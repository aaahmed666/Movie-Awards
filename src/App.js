import "./App.css";
import LoginPage from "./components/LoginPage";
import NomineesPage from "./components/NomineesPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/nominees" element={<NomineesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
