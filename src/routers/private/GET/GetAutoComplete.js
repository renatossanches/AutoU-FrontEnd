export const GetAutoComplete = async (query, n = 5) => {
    if (!query) return [];
    try {
      const response = await fetch(
        `https://autou-backend-653q.onrender.com/autocomplete/?q=${encodeURIComponent(query)}&n=${n}`
      );
      if (!response.ok) throw new Error("Erro ao buscar autocomplete");
  
      const data = await response.json();
      return data.suggestions || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };
  