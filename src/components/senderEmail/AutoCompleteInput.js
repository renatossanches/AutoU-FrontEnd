import React, { useState, useEffect, useRef } from "react";
import { GetAutoComplete } from "../../routers/private/GET/GetAutoComplete";

export const AutoCompleteInput = ({ value, onChange, placeholder, n = 5, rows = 1, field }) => {
  const [internalValue, setInternalValue] = useState(value || "");
  const [suggestion, setSuggestion] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debounceRef = useRef(null);

  // Atualiza o valor se o pai mudar
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const fetchSuggestions = async (query) => {
    const results = await GetAutoComplete(query, n);
    setSuggestions(results);

    const match = results.find((s) => s.toLowerCase().startsWith(query.toLowerCase()));
    setSuggestion(match && match !== query ? match : "");
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setInternalValue(input);
    onChange?.(input);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(input), 200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      setInternalValue(suggestion);
      onChange?.(suggestion);
      setSuggestion("");
    }
  };

  return (
<div className="relative w-full">
  {/* Overlay da sugestão */}
  <div
    className="absolute top-0 left-0 w-full text-gray-400 p-2 whitespace-pre-wrap pointer-events-none"
    style={{ zIndex: 1}} // cinza claro
  >
    <span className="text-transparent">{internalValue}</span>
    {suggestion && <span>{suggestion.slice(internalValue.length)}</span>}
  </div>

  {rows > 1 ? (
    <textarea
      className="w-full border rounded-lg p-2 relative bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-300"
      value={internalValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      rows={rows}
    />
  ) : (
    <input
      type="text"
      className="w-full border rounded-lg p-2 relative bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-300"
      value={internalValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
    />
  )}
</div>


  );
};
