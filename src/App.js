import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Sidebar from "./components/sidebar/Sidebar";
import SenderEmail from "./components/senderEmail/SenderEmail";
import InputMail from "./components/inputBoxMail/InputMail";
import HeaderTop from "./components/header/HeaderTop";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./App.css";
import MailImprodutive from "./components/categories/MailImprodutive";

export const AuthContext = React.createContext();

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <HeaderTop darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        <div className="dark:bg-gray-800 pt-12">
          {user ? (
            <div className="app flex h-screen">
              <Sidebar />
              <div className="flex-1 p-4 overflow-auto">
                <Routes>
                  <Route path="/enviar" element={<SenderEmail />} />
                  <Route path="/entrada" element={<InputMail />} />
                  <Route path="/categorias" element={<MailImprodutive />} />
                  <Route path="*" element={<Navigate to="/entrada" />} />
                </Routes>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </div>
          )}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
