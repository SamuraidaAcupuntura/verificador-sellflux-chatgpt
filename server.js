const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();

// Configurações básicas do servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve o index.html da pasta 'public'

// Rota para verificar acesso
app.post("/verificar-acesso", async (req, res) => {
  const { email } = req.body;

  try {
    // NOVO WEBHOOK com o e-mail como parâmetro
    const webhookUrl = `https://webhook.sellflux.app/webhook/lead/2f5079211e47aae637f5b6b0ef0532df?email=${encodeURIComponent(email)}`;

    const resposta = await fetch(webhookUrl);
    const resultado = await resposta.json();

    if (resultado.acesso) {
      res.redirect("https://chat.openai.com/gpts/editor/g-8sC9wzqJZ");
    } else {
      res.send(`
        <h2>Acesso negado</h2>
        <p>Compra não ativa ou não encontrada.</p>
        <a href="/">Voltar</a>
      `);
    }
  } catch (err) {
    console.error("Erro ao verificar acesso:", err);
    res.status(500).send("Erro interno ao verificar acesso.");
  }
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
