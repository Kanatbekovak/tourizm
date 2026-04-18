import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Проверь, чтобы пути к файлам были правильными!
import MarketplacePage from "../pages/MarketplacePage.jsx"; 
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import TurAgents from "../pages/TurAgents.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Вот эта строка связывает адрес "/" с твоей страницей */}
        <Route path="/" element={<MarketplacePage />} />
        <Route path="/agencies" element={<TurAgents />} />

        
        {/* Если у тебя есть страница чата, добавь её тоже: */}
        {/* <Route path="/chat" element={<ChatPage />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;