export const FetchEmailsUser = async (userId, setEmails) => {
  if (!userId) return;
  try {
    const response = await fetch(
      `https://autou-backend-653q.onrender.com/emails/user/${userId}`
    );
    if (!response.ok) throw new Error("Erro ao buscar emails");

    const data = await response.json();

    setEmails(data);
  } catch (err) {
    console.error(err);
  }
};
