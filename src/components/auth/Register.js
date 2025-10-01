import React, { useState, useContext } from "react";
import { AuthContext } from "../../App";
import { useNavigate, Link } from "react-router";
import { PostRegisterUser } from "../../routers/public/POST/PostRegisterUser";

export default function Register() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
    
        const user = { email, password, name };
        const data = await PostRegisterUser(user);
    
        if (data.error) {
          setError(data.error);
          return;
        }
    
        // Loga automaticamente o usuário
        setUser(data);
        navigate("/entrada");
      };

      return (
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96 mx-auto mt-24">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
            Cadastro
          </h2>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nome"
              className="p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              className="p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded transition"
            >
              Cadastrar
            </button>
          </form>
          {error && (
            <p className="mt-2 text-red-500 text-center">
              {error}
            </p>
          )}
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
            Já tem conta?{" "}
            <Link to="/login" className="text-orange-500 hover:underline">
              Entre
            </Link>
          </p>
        </div>
      );
    }
