import React, { useState } from "react";
import { ReactComponent as SvgMail } from "../../issues/svgMail.svg";
import { ReactComponent as SvgAddEmail } from "../../issues/svgAddEmailSender.svg";
import { useNavigate } from "react-router";

export default function Sidebar() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("📥 Caixa de entrada");

  const menuItems = [
    { icon: <SvgMail className="w-5 h-5 text-black dark:text-white" />, label: "Caixa de entrada", path: "/entrada" },
    { icon: "📌", label: "Categorias", path: "/categorias" },
    { icon: "📤", label: "Enviados", path: "/enviados" },
    { icon: "🗑", label: "Lixeira", path: "/lixeira" },
    { icon: "⚙️", label: "Configurações", path: "/configuracoes" },
  ];

  return (
    <div className="w-60 h-screen bg-gray-100 dark:bg-gray-900 border-r p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white">
          <img src="mail.png" alt="Logo" className="w-8 h-6 inline" /> AutoU
        </h2>
        <button
          className="px-2 py-1 bg-orange-400 hover:bg-orange-600 text-white rounded-lg shadow flex items-center dark:bg-black dark:hover:bg-black"
          onClick={() => navigate("/enviar")}
        >
          <span className="text-white">Escrever</span>
          <div className="inline-block overflow-hidden">
            <SvgAddEmail className="w-7 h-5 fill-black dark:fill-white" />
          </div>
        </button>
      </div>

      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.label}>
            <button
              onClick={() => {
                setSelected(item.label);
                navigate(item.path);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition ${
                selected === item.label
                  ? "bg-orange-300 dark:bg-gray-800 text-white font-semibold"
                  : "hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white"
              }`}
            >
              <span className="inline-flex px-3 py-2 items-center">{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
