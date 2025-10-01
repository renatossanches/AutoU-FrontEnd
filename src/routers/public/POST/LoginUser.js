// src/routers/public/LoginUser.js
export default async function LoginUser(conteudo, setResultado) {
    try {
      const response = await fetch("https://autou-backend-653q.onrender.com/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(conteudo),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || `Erro na requisição: ${response.status}`);
      }
  
      const data = await response.json();
      setResultado(data);
    } catch (err) {
      console.error("Erro ao logar:", err);
      setResultado({ error: err.message || "Erro ao logar" });
    }
  }
  