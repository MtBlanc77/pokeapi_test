const express = require("express");
const cors = require("cors");
const path = require("path");
const pokemon = require("../data/pokemon.json");

const app = express();
const PORT = process.env.PORT || 3001;

// Habilitar CORS
app.use(cors());

// Servir archivos estáticos (sprites, tipos, etc)
app.use(express.static(path.join(__dirname, "..", "public")));

// Endpoint principal
app.get("/pokemon", (req, res) => {
  const limit = parseInt(req.query.limit || "10", 10);
  const slice = pokemon.slice(0, limit);

  // IMPORTANTE: Construir URLs completas de imagen
  const response = slice.map((p) => ({
    ...p,
    sprite: `http://localhost:${PORT}${p.sprite}`,
    types: p.types.map((t) => ({
      ...t,
      icon: t.icon ? `http://localhost:${PORT}${t.icon}` : null
    }))
  }));

  res.json({
    count: pokemon.length,
    results: response
  });
});

// Endpoint por ID
app.get("/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const p = pokemon.find((pkm) => pkm.id === id);

  if (!p) return res.status(404).json({ message: "Pokemon not found" });

  const response = {
    ...p,
    sprite: `http://localhost:${PORT}${p.sprite}`,
    types: p.types.map((t) => ({
      ...t,
      icon: t.icon ? `http://localhost:${PORT}${t.icon}` : null
    }))
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`PokeAPI test escuchando en http://localhost:${PORT}`);
});
