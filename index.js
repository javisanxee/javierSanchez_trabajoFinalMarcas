const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// DATOS - Jugadores del Real Madrid
let jugadores = [
  { id: 1, nombre: "Thibaut Courtois", posicion: "Portero", dorsal: 1, nacionalidad: "Belga", edad: 32, valor_mercado: 40, goles_temporada: 0, activo: true },
  { id: 2, nombre: "Dani Carvajal", posicion: "Defensa", dorsal: 2, nacionalidad: "Española", edad: 32, valor_mercado: 20, goles_temporada: 1, activo: true },
  { id: 3, nombre: "Eder Militao", posicion: "Defensa", dorsal: 3, nacionalidad: "Brasileña", edad: 26, valor_mercado: 70, goles_temporada: 2, activo: true },
  { id: 4, nombre: "David Alaba", posicion: "Defensa", dorsal: 4, nacionalidad: "Austriaca", edad: 32, valor_mercado: 18, goles_temporada: 0, activo: false },
  { id: 5, nombre: "Jude Bellingham", posicion: "Centrocampista", dorsal: 5, nacionalidad: "Inglesa", edad: 21, valor_mercado: 180, goles_temporada: 23, activo: true },
  { id: 6, nombre: "Nacho Fernandez", posicion: "Defensa", dorsal: 6, nacionalidad: "Española", edad: 34, valor_mercado: 8, goles_temporada: 1, activo: true },
  { id: 7, nombre: "Vinicius Junior", posicion: "Delantero", dorsal: 7, nacionalidad: "Brasileña", edad: 24, valor_mercado: 200, goles_temporada: 24, activo: true },
  { id: 8, nombre: "Toni Kroos", posicion: "Centrocampista", dorsal: 8, nacionalidad: "Alemana", edad: 34, valor_mercado: 15, goles_temporada: 5, activo: true },
  { id: 9, nombre: "Joselu", posicion: "Delantero", dorsal: 9, nacionalidad: "Española", edad: 34, valor_mercado: 10, goles_temporada: 16, activo: true },
  { id: 10, nombre: "Luka Modric", posicion: "Centrocampista", dorsal: 10, nacionalidad: "Croata", edad: 38, valor_mercado: 8, goles_temporada: 3, activo: true },
  { id: 11, nombre: "Rodrygo Goes", posicion: "Delantero", dorsal: 11, nacionalidad: "Brasileña", edad: 23, valor_mercado: 120, goles_temporada: 14, activo: true },
  { id: 12, nombre: "Eduardo Camavinga", posicion: "Centrocampista", dorsal: 12, nacionalidad: "Francesa", edad: 21, valor_mercado: 100, goles_temporada: 4, activo: true },
];

// GET /jugadores - Conseguir todos los jugadores
app.get("/jugadores", (req, res) => {
  try {
    res.status(200).json({
      total: jugadores.length,
      jugadores: jugadores,
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// buscar jugador por id
app.get("/jugadores/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const jugador = jugadores.find(j => j.id === id);
    if (!jugador) {
      return res.status(404).json({ error: "jugador no encontrado" });
    }
    res.status(200).json(jugador);
  } catch (error) {
    res.status(500).json({ error: "algo salio mal" });
  }
});

// buscar jugador por nombre usando query param
app.get("/jugadores/buscar/nombre", (req, res) => {
  try {
    if (!req.query.nombre) {
      return res.status(400).json({ error: "tienes que indicar un nombre" });
    }
    const nombre = req.query.nombre.toLowerCase();
    const resultado = jugadores.filter(j => j.nombre.toLowerCase().includes(nombre));
    if (resultado.length === 0) {
      return res.status(404).json({ error: "no se encontro ningun jugador con ese nombre" });
    }
    res.status(200).json({ total: resultado.length, jugadores: resultado });
  } catch (error) {
    res.status(500).json({ error: "algo salio mal" });
  }
});

// crear un jugador nuevo
app.post("/jugadores", (req, res) => {
  try {
    const { nombre, posicion, dorsal, nacionalidad, edad, valor_mercado, goles_temporada, activo } = req.body;

    if (!nombre || !posicion || !dorsal || !nacionalidad || edad === undefined || valor_mercado === undefined) {
      return res.status(400).json({ error: "faltan campos obligatorios: nombre, posicion, dorsal, nacionalidad, edad, valor_mercado" });
    }

    const nuevoJugador = {
      id: jugadores.length + 1,
      nombre,
      posicion,
      dorsal,
      nacionalidad,
      edad,
      valor_mercado,
      goles_temporada: goles_temporada ?? 0,
      activo: activo ?? true,
    };

    jugadores.push(nuevoJugador);
    res.status(201).json({ mensaje: "jugador creado correctamente", jugador: nuevoJugador });
  } catch (error) {
    res.status(500).json({ error: "algo salio mal" });
  }
});

// modificar un jugador
app.put("/jugadores/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const index = jugadores.findIndex(j => j.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "jugador no encontrado" });
    }
    jugadores[index] = { ...jugadores[index], ...req.body, id };
    res.status(200).json({ mensaje: "jugador modificado correctamente", jugador: jugadores[index] });
  } catch (error) {
    res.status(500).json({ error: "algo salio mal" });
  }
});

// eliminar un jugador
app.delete("/jugadores/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const index = jugadores.findIndex(j => j.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "jugador no encontrado" });
    }
    const eliminado = jugadores.splice(index, 1)[0];
    res.status(200).json({ mensaje: "jugador eliminado correctamente", jugador: eliminado });
  } catch (error) {
    res.status(500).json({ error: "algo salio mal" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor arrancado en http://localhost:${PORT}`);
});