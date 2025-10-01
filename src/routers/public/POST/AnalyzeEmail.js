export default async function AnalyzeEmail(conteudo, setResultado) {
  try {
    const formData = new FormData();
    formData.append("emailText", conteudo);

    const response = await fetch("http://127.0.0.1:8000/email/processar", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    setResultado(data);
  } catch (err) {
    console.error("Erro ao analisar email:", err);
    setResultado({
      categoria: "Erro",
      resposta: "Não foi possível processar o email.",
    });
  }
}
