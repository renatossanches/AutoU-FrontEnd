import React, { useState, useContext } from "react";
import { AuthContext } from "../../App";
import { useNavigate, Link } from "react-router";
import LoginUser from "../../routers/public/POST/LoginUser";

export default function Login() {
    const { setUser, setToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    await LoginUser({ email, password }, (data) => {
      if (data.error) {
      } else {
        setUser({ id: data.id, email: data.email, name: data.name });
        setToken(data.access_token);
        navigate("/entrada");
      }
    });
  };


  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
          Entrar
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
        Não tem conta?{" "}
        <Link to="/register" className="text-orange-500 hover:underline">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
