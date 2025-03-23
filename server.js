const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();

// Configuração para ler o corpo das requisições e servir arquivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Mostra o formulário HTML da pasta 'public'

// Rota para processar o formulário
app.post("/verificar-acesso", async (req, res) => {
  const { email } = req.body;

  try {
    // Monta a URL do webhook com o e-mail na query string
    const webhookUrl = `https://webhook.sellflux.app/webhook/lead/2f5079211e47aae637f5b6b0ef0532df?email=teste@gmail.com?email=${encodeURIComponent(email)}`;

    // Envia a requisição para o webhook da Sellflux
    const resposta = await fetch(webhookUrl);
    const resultado = await resposta.json();

    // Verifica se o usuário tem acesso
    if (resultado.acesso) {
      res.redirect("https://chat.openai.com/gpts/editor/g-8sC9wzqJZ"); // Redireciona pro seu assistente
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

// Inicializa o servidor na porta 3000 (ou a que o Render definir)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
