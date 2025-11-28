const express = require("express");
const cors = require("cors");
const path = require("path");
const pokemon = require("../data/pokemon.json");

const app = express();
const PORT = process.env.PORT || 3001;
    
// Habilitar CORS para que la web en otro puerto pueda consumir
app.use(cors());

// Servir archivos estáticos (sprites, types, etc.)
app.use(express.static(path.join(__dirname, "..", "public")));

// Endpoint principal: /pokemon?limit=10
app.get("/pokemon", (req, res) => {
  const limit = parseInt(req.query.limit || "10", 10);
  const slice = pokemon.slice(0, limit);

  res.json({
    count: pokemon.length,
    next: null,
    previous: null,
    results: slice
  });
});

// Endpoint detalle opcional: /pokemon/:id
app.get("/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const pokemon = pokemon.find((p) => p.id === id);

  if (!pokemon) {
    return res.status(404).json({ message: "Pokemon not found" });
  }

  res.json(pokemon);
});

app.listen(PORT, () => {
  console.log(`PokeAPI test escuchando en http://localhost:${PORT}`);
});