import React, { useState, useEffect, useContext } from "react";
import { ReactComponent as SvgMail } from "../../issues/svgMail.svg";
import { AuthContext } from "../../App";
import { FetchEmailsUser } from "../../routers/private/GET/FetchEmailUser";

export default function MailImprodutive() {
  const { user } = useContext(AuthContext);
  const [emails, setEmails] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) return;
    FetchEmailsUser(user.id, setEmails);
  }, [user]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearch(searchInput.toLowerCase());
    }
  };

  const unproductiveEmails = emails.filter(
    (email) => email.categoria.trim().toLowerCase() === "Improdutivo"
  );

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-black p-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white flex justify-center">
        <SvgMail className="w-5 mr-2 text-black dark:text-white" /> Categoria - Improdutivos
      </h2>

      <input
        type="text"
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Pesquisar..."
        className="border p-3 rounded mb-10"
        onKeyDown={handleKeyDown}
      />

      <ul className="space-y-3">
        {unproductiveEmails
          .filter((email) => {
            if (search === "") return true;
            return (
              email.subject.toLowerCase().includes(search) ||
              email.sender_email.toLowerCase().includes(search) ||
              email.body.toLowerCase().includes(search)
            );
          })
          .map((email) => (
            <li
              key={email.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition bg-gray-50 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">{email.sender_email}</span>
                <span className="text-sm text-gray-500">{email.data}</span>
              </div>
              <p className="text-md font-medium text-gray-700">{email.subject}</p>
              <p className="text-sm text-gray-500 truncate">{email.body}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
