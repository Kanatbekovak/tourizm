import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MarketplacePage from "../pages/MainPage.jsx"; 
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import TurAgents from "../pages/TurAgents.jsx";
import ToursPage from "../pages/ToursPage.jsx";
import AuthPage from "../pages/AuthPage.jsx";
import MapPage from "../pages/MapPage.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Вот эта строка связывает адрес "/" с твоей страницей */}
        <Route path="/" element={<MarketplacePage />} />
        <Route path="/agencies" element={<TurAgents />} />
        <Route path="/account" element={<AuthPage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/map" element={<MapPage />} />
        {/* Если у тебя есть страница чата, добавь её тоже: */}
        {/* <Route path="/chat" element={<ChatPage />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;