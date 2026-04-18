import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MarketplacePage from "../pages/MainPage.jsx"; 
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ToursPage from "../pages/ToursPage.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Вот эта строка связывает адрес "/" с твоей страницей */}
        <Route path="/" element={<MarketplacePage />} />
        <Route path="/tours" element={<ToursPage />} />
        {/* Если у тебя есть страница чата, добавь её тоже: */}
        {/* <Route path="/chat" element={<ChatPage />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;