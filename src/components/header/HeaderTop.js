import React, { useState, useContext } from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router";

export default function HeaderTop({ darkMode, toggleDarkMode }) {
  const { user, setUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); 
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-12 flex items-center justify-end px-4 bg-gray-100 dark:bg-gray-900 z-50">
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition transform hover:scale-105 mr-4"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {user && (
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center focus:outline-none"
          >
            <img
              src={"https://i.ibb.co/GQSLMj77/user.png"}
              alt="Usuário"
              className="w-9 h-9 rounded-full border"
            />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-orange-500 dark:bg-black rounded-lg shadow-lg dark:border-gray-200">
              <ul className="py-2 text-sm text-white dark:text-gray-200">
                <li>
                  <a
                    href="/perfil"
                    className="block px-4 py-2 hover:bg-orange-600 dark:hover:bg-gray-900"
                  >
                    Perfil
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 hover:bg-orange-600 dark:hover:bg-gray-900"
                  >
                    Sair
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
