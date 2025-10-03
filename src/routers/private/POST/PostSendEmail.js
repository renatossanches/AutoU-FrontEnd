export const PostSendEmail = async ({ receiver_email, subject, body }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "https://autou-backend-653q.onrender.com/emails/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ receiver_email, subject, body }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erro ao enviar email:", err.message);
    return { error: err.message };
  }
};
