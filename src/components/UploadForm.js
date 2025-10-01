import React, { useState } from "react";

export default function UploadForm({ onAnalyze }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text) {
      onAnalyze(text);
    } else if (file) {
      const formData = new FormData();
      formData.append("fileUpload", file);
      const response = await fetch("http://127.0.0.1:8000/email/processar", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      onAnalyze(data.resposta);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
      <textarea
        placeholder="Digite ou cole o email..."
        className="w-full border p-2 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <input
        type="file"
        accept=".txt,.pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Analisar
      </button>
    </form>
  );
}
