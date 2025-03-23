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
    // URL do webhook com o e-mail do usuário
    const webhookUrl = `https://webhook.sellflux.app/webhook/lead/676bb4e366188619b98ffeaf629cbed9?email=${encodeURIComponent(email)}`;

    const resposta = await fetch(webhookUrl);
    const resultado = await resposta.json();

    // Se o usuário tiver acesso, redireciona para o assistente
    if (resultado.acesso) {
      res.redirect("https://chat.openai.com/gpts/editor/g-8sC9wzqJZ");
    } else {
      // Se não tiver acesso, mostra mensagem de bloqueio
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
