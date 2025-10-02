import React, { useState, useEffect, useContext } from "react";
import { ReactComponent as SvgMail } from "../../issues/svgMail.svg";
import { AuthContext } from "../../App";
import { FetchEmailsUser } from "../../routers/private/GET/FetchEmailUser";
import { GetAutoComplete } from "../../routers/private/GET/GetAutoComplete";

export default function InputMail() {
  const { user } = useContext(AuthContext);
  const [emails, setEmails] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  useEffect(() => {
    if (!user) return;
    console.log(user);
    FetchEmailsUser(user.id, setEmails);
    setSuggestions([]);
    setHighlightIndex(-1);
  }, [user]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        setSearchInput(suggestions[highlightIndex]);
        setSuggestions([]);
      } else {
        setSearch(searchInput.toLowerCase());
        setSuggestions([]);
      }
    } else if (e.key === "ArrowDown") {
      setHighlightIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setHighlightIndex(-1);
      return;
    }

    const results = await GetAutoComplete(value, 5);
    setSuggestions(results);
    setHighlightIndex(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    setSuggestions([]);
  };

  const productiveEmails = emails.filter(
    (email) => email.categoria === "Produtivo"
  );

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-black p-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white flex justify-center">
        <SvgMail className="w-5 mr-2 text-black dark:text-white" /> Caixa de Entrada - Importantes
      </h2>

      <input
        type="text"
        value={searchInput}
        onChange={handleChange}
        placeholder="Pesquisar..."
        className="border p-3 rounded mb-2"
        onKeyDown={handleKeyDown}
      />

      {/* Sugestões de autocomplete */}
      {suggestions.length > 0 && (
        <ul className="mb-4 border rounded p-2 bg-gray-100">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              onClick={() => handleSuggestionClick(s)}
              className={`p-1 cursor-pointer ${
                idx === highlightIndex ? "bg-blue-200 font-semibold" : "hover:bg-gray-200"
              }`}
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      <ul className="space-y-3">
        {productiveEmails
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
                <span className="text-sm text-gray-500">{email.date}</span>
              </div>
              <p className="text-md font-medium text-gray-700">{email.subject}</p>
              <p className="text-sm text-gray-500 truncate">{email.body}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
