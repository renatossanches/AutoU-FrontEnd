import React, { useState } from "react";
import UploadForm from "./UploadForm";
import { AnalyzeEmail } from "../routers/public/POST/AnalyzeEmail";
export default function EmailViewer({ email }) {
  const [resultado, setResultado] = useState(null);

  if (!email) {
    return <div className="flex-1 flex items-center justify-center text-gray-500">Selecione um email</div>;
  }

  return (
    <div className="flex-1 p-6 flex flex-col">
      <h2 className="text-xl font-bold">{email.subject}</h2>
      <p className="text-gray-700 mb-6">De: {email.from}</p>
      <p className="mb-6">{email.preview}</p>

      {
      // <UploadForm onAnalyze={AnalyzeEmail} /> 
      }
      
      {resultado && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <p><strong>Categoria:</strong> {resultado.categoria}</p>
          <p><strong>Resposta sugerida:</strong> {resultado.resposta}</p>
        </div>
      )}
    </div>
  );
}
