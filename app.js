const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');

// Middlewares
app.use(express.json());

// Rutas
app.use('/tasks', tasksRouter);

// Manejo de errores
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, async () => {
  const db = require('./database');
  await db.sync();
  console.log(`Servidor en http://localhost:${PORT}`);
});