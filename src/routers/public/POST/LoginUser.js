export default async function LoginUser(conteudo, setResultado) {
  try {
    const response = await fetch("https://autou-backend-653q.onrender.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(conteudo),
    });

    // Se a resposta não for OK, lança erro com o detalhe retornado
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Erro na requisição: ${response.status}`);
    }

    // Converte a resposta em JSON
    const data = await response.json();

    // 👇 Salva o token no localStorage
    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
    }

    // Atualiza o estado no React
    setResultado(data);

  } catch (err) {
    console.error("Erro ao logar:", err);
    setResultado({ error: err.message || "Erro ao logar" });
  }
}
