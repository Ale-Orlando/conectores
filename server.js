const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para procesar JSON y servir archivos estáticos (HTML, CSS, JS)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 1\. Inicializar la base de datos SQL en su versión más reducida (SQLite)
const db = new sqlite3.Database('./datos.db', (err) => {
    if (err) {
        console.error('Error al conectar con SQLite:', err.message);
    } else {
        console.log('Conectado a la base de datos SQL (SQLite).');
    }
});

// 2\. Crear la tabla si no existe
db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL
    )
`);

// 3\. Ruta para AGREGAR información a la base de datos SQL
app.post('/api/agregar', (req, res) => {
    const { nombre, email } = req.body;
    const sql = `INSERT INTO usuarios (nombre, email) VALUES (?, ?)`

    db.run(sql, [nombre, email], function (err) {
        if (err){
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, nombre, email });
     });
});

// 4\. Ruta para EXTRAER información de la base de datos SQL
app.get('/api/datos', (req, res) => {
    const sql = `SELECT * FROM usuarios`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// 5\. Iniciar el servidor
app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
});