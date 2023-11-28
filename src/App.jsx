import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Join from './pages/join.jsx';
import About from './pages/about.jsx';
import Home from './pages/home.jsx';
import Recipes from './pages/recipes.jsx';
import NotFound from './pages/notfound.jsx';
import Contact from './pages/contact.jsx';

import NavBar from './components/NavBar.jsx';

import ResetPassword from './components/ResetPassword.jsx';
import NewPassword from './components/NewPassword.jsx'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter basename="/">
      <div className="App-class">
        <NavBar />
        <div id="App-id">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/recipes"
              element={<Recipes isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
            />
            <Route path="/recipes/:recipeId" element={<Recipes isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
            <Route path="/join" element={<Join setIsLoggedIn={setIsLoggedIn} onLogin={handleLogin} />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/new-password/:token" element={<NewPassword />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
