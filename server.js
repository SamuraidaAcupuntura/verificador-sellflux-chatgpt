const express = require("express");
const path = require("path");
const app = express();

// Lista de e-mails com acesso liberado
const emailsComAcesso = [
  "alceuacosta@gmail.com",
  "samuraidaacupuntura@gmail.com",
  "paulocosta@samuraidaacupuntura.com.br"
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Rota para verificar o e-mail
app.post("/verificar-acesso", (req, res) => {
  const { email } = req.body;

  if (emailsComAcesso.includes(email.toLowerCase().trim())) {
   res.redirect("https://chatgpt.com/g/g-67dcbe58a18c81919e2fc5720d982394-jornada-do-samurai-mtc"); // Link do seu assistente
  } else {
    res.send(`
      <h2>Acesso negado</h2>
      <p>Compra não ativa ou não encontrada.</p>
      <a href="/">Voltar</a>
    `);
  }
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
