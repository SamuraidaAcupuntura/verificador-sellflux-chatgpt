const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/verificar-acesso", async (req, res) => {
  const { email } = req.body;

  try {
    const resposta = await fetch("https://master.sellflux.com/api/hooks/SEU_WEBHOOK_AQUI", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const resultado = await resposta.json();

    if (resultado.acesso) {
      res.redirect("https://chat.openai.com/gpts/editor/g-8sC9wzqJZ"); // link do seu assistente
    } else {
      res.send(`
        <h2>Acesso negado</h2>
        <p>Compra não ativa ou não encontrada.</p>
        <a href="/">Voltar</a>
      `);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao verificar acesso.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
