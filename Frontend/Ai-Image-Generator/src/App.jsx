import React from "react";
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Page from "./page";
import { logo } from "./assets";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page" element={<Page />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/');
  };

  return (
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </Link>

      {location.pathname === "/page" && (
        <button
          onClick={handleExit}
          className="font-inter font-medium bg-[#ff6464] text-white px-4 py-2 rounded-md"
        >
          Exit
        </button>
      )}
    </header>
  );
};

const Home = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <h1 className="text-4xl font-bold mb-4">Welcome to Our App!</h1>
    <p className="text-lg mb-8">Explore the features of our application and generate amazing images with ease.</p>
    <Link
      to="/page"
      className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
    >
      Get Started
    </Link>
  </div>
);

export default App;
