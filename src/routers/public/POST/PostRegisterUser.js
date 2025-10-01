export async function PostRegisterUser(bodyp) {
    try {
        const response = await fetch(
          "https://autou-backend-653q.onrender.com/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyp),
          }
        );
    
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
    
        const data = await response.json();
        return data;
      } catch (err) {
        console.error("Erro ao registrar:", err);
        return { error: "Erro ao registrar" };
      }
    }