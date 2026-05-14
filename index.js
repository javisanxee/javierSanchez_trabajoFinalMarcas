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

// datos de goles
let goles = [
  { id: 1, jugador_id: 7, rival: "Barcelona", fecha: "2024-10-26", minuto: 56, tipo_gol: "Remate" },
  { id: 2, jugador_id: 5, rival: "Atletico de Madrid", fecha: "2024-09-29", minuto: 78, tipo_gol: "Disparo lejano" },
  { id: 3, jugador_id: 7, rival: "Bayern Munich", fecha: "2024-04-30", minuto: 88, tipo_gol: "Remate" },
  { id: 4, jugador_id: 9, rival: "Borussia Dortmund", fecha: "2024-06-01", minuto: 34, tipo_gol: "Cabezazo" },
  { id: 5, jugador_id: 5, rival: "Napoles", fecha: "2024-11-05", minuto: 12, tipo_gol: "Penalti" },
  { id: 6, jugador_id: 11, rival: "Celta de Vigo", fecha: "2024-12-07", minuto: 67, tipo_gol: "Remate" },
  { id: 7, jugador_id: 8, rival: "RB Leipzig", fecha: "2024-03-06", minuto: 45, tipo_gol: "Disparo lejano" },
  { id: 8, jugador_id: 7, rival: "Girona", fecha: "2024-02-10", minuto: 90, tipo_gol: "Remate" },
  { id: 9, jugador_id: 10, rival: "Getafe", fecha: "2024-01-18", minuto: 22, tipo_gol: "Disparo lejano" },
  { id: 10, jugador_id: 9, rival: "Sevilla", fecha: "2024-11-27", minuto: 55, tipo_gol: "Cabezazo" },
];

// obtener todos los goles, con filtro opcional por rival
app.get("/goles", (req, res) => {
  try {
    let resultado = [...goles];
    if (req.query.rival) {
      const rival = req.query.rival.toLowerCase();
      resultado = resultado.filter(g => g.rival.toLowerCase().includes(rival));
    }
    res.status(200).json({ total: resultado.length, goles: resultado });
  } catch (error) {
    res.status(500).json({ error: "algo salio mal" });
  }
});

// obtener los goles de un jugador concreto
app.get("/goles/jugador/:jugador_id", (req, res) => {
  try {
    const jugador_id = Number(req.params.jugador_id);
    const jugador = jugadores.find(j => j.id === jugador_id);
    if (!jugador) {
      return res.status(404).json({ error: "jugador no encontrado" });
    }
    const resultado = goles.filter(g => g.jugador_id === jugador_id);
    res.status(200).json({ jugador: jugador.nombre, total_goles: resultado.length, goles: resultado });
  } catch (error) {
    res.status(500).json({ error: "algo salio mal" });
  }
});

// crear un gol nuevo
app.post("/goles", (req, res) => {
  try {
    const { jugador_id, rival, fecha, minuto, tipo_gol } = req.body;
    if (!jugador_id || !rival || !fecha || minuto === undefined || !tipo_gol) {
      return res.status(400).json({ error: "faltan campos obligatorios: jugador_id, rival, fecha, minuto, tipo_gol" });
    }
    const jugador = jugadores.find(j => j.id === jugador_id);
    if (!jugador) {
      return res.status(404).json({ error: "jugador no encontrado" });
    }
    const nuevoGol = { id: goles.length + 1, jugador_id, rival, fecha, minuto, tipo_gol };
    goles.push(nuevoGol);
    res.status(201).json({ mensaje: "gol registrado correctamente", gol: nuevoGol });
  } catch (error) {
    res.status(500).json({ error: "algo salio mal" });
  }
});

// eliminar un gol
app.delete("/goles/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const index = goles.findIndex(g => g.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "gol no encontrado" });
    }
    const eliminado = goles.splice(index, 1)[0];
    res.status(200).json({ mensaje: "gol eliminado correctamente", gol: eliminado });
  } catch (error) {
    res.status(500).json({ error: "algo salio mal" });
  }
});

// filtros del recurso principal
app.get("/jugadores/filtros/buscar", (req, res) => {
  try {
    let resultado = [...jugadores];
    if (req.query.posicion) resultado = resultado.filter(j => j.posicion.toLowerCase().includes(req.query.posicion.toLowerCase()));
    if (req.query.nacionalidad) resultado = resultado.filter(j => j.nacionalidad.toLowerCase().includes(req.query.nacionalidad.toLowerCase()));
    if (req.query.activo !== undefined) resultado = resultado.filter(j => j.activo === (req.query.activo === "true"));
    if (req.query.edad_min) resultado = resultado.filter(j => j.edad >= Number(req.query.edad_min));
    if (req.query.edad_max) resultado = resultado.filter(j => j.edad <= Number(req.query.edad_max));
    if (req.query.valor_min) resultado = resultado.filter(j => j.valor_mercado >= Number(req.query.valor_min));
    if (req.query.valor_max) resultado = resultado.filter(j => j.valor_mercado <= Number(req.query.valor_max));
    if (req.query.goles_min) resultado = resultado.filter(j => j.goles_temporada >= Number(req.query.goles_min));
    if (req.query.ordenar) {
      const campo = req.query.ordenar;
      const orden = req.query.orden === "desc" ? -1 : 1;
      resultado = resultado.sort((a, b) => (a[campo] - b[campo]) * orden);
    }
    res.status(200).json({ total: resultado.length, jugadores: resultado });
  } catch (error) {
    res.status(500).json({ error: "algo salio mal" });
  }
});

// estadisticas: media, maximo y minimo de un campo
app.get("/estadisticas/jugadores", (req, res) => {
  try {
    const campo = req.query.campo || "goles_temporada";
    const camposValidos = ["valor_mercado", "goles_temporada", "edad"];
    if (!camposValidos.includes(campo)) {
      return res.status(400).json({ error: "campo no valido, usa: valor_mercado, goles_temporada o edad" });
    }
    const valores = jugadores.map(j => j[campo]);
    const media = (valores.reduce((a, b) => a + b, 0) / valores.length).toFixed(2);
    res.status(200).json({ campo, media: Number(media), maximo: Math.max(...valores), minimo: Math.min(...valores) });
  } catch (error) {
    res.status(500).json({ error: "algo salio mal" });
  }
});

// top N jugadores por un campo
app.get("/estadisticas/top", (req, res) => {
  try {
    const campo = req.query.campo || "goles_temporada";
    const n = Number(req.query.n) || 5;
    const orden = req.query.orden === "asc" ? 1 : -1;
    const resultado = [...jugadores].sort((a, b) => (a[campo] - b[campo]) * orden).slice(0, n);
    res.status(200).json({ campo, n, jugadores: resultado });
  } catch (error) {
    res.status(500).json({ error: "algo salio mal" });
  }
});

// total de registros
app.get("/estadisticas/totales", (req, res) => {
  try {
    res.status(200).json({ total_jugadores: jugadores.length, total_goles: goles.length });
  } catch (error) {
    res.status(500).json({ error: "algo salio mal" });
  }
});

// jugadores agrupados por posicion
app.get("/estadisticas/por-posicion", (req, res) => {
  try {
    const agrupado = jugadores.reduce((acc, j) => {
      acc[j.posicion] = (acc[j.posicion] || 0) + 1;
      return acc;
    }, {});
    res.status(200).json({ jugadores_por_posicion: agrupado });
  } catch (error) {
    res.status(500).json({ error: "algo salio mal" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor arrancado en http://localhost:${PORT}`);
});