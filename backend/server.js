require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '523222380588';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'bahiaparaiso2025';

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// POST /leads — guarda lead y notifica al vendedor
app.post('/leads', (req, res) => {
  const { mensualidad, uso, plazo } = req.body;
  if (!mensualidad || !uso || !plazo) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const stmt = db.prepare(
    'INSERT INTO leads (mensualidad, uso, plazo) VALUES (?, ?, ?)'
  );
  const result = stmt.run(mensualidad, uso, plazo);
  // node:sqlite returns changes object

  // URL de notificación al vendedor
  const fecha = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });
  const msgVendedor = encodeURIComponent(
    `🏡 *Nuevo lead — Bahía Paraíso*\n\n` +
    `📅 ${fecha}\n` +
    `💰 Mensualidad: ${mensualidad}\n` +
    `🏠 Uso: ${uso}\n` +
    `📆 Plazo: ${plazo}\n\n` +
    `Contáctalo cuanto antes.`
  );
  const notifUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${msgVendedor}`;

  res.json({ ok: true, id: result.lastInsertRowid, notifUrl });
});

// GET /admin — panel protegido
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin/index.html'));
});

// GET /api/leads — devuelve leads (requiere password en header o query)
app.get('/api/leads', (req, res) => {
  const pass = req.headers['x-admin-password'] || req.query.password;
  if (pass !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const leads = db.prepare('SELECT * FROM leads ORDER BY creado_en DESC').all();

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const semana = new Date(hoy); semana.setDate(hoy.getDate() - 7);
  const mes = new Date(hoy); mes.setDate(1);

  const contadores = db.prepare(`
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN creado_en >= date('now','localtime','start of day') THEN 1 ELSE 0 END) as hoy,
      SUM(CASE WHEN creado_en >= date('now','localtime','-7 days') THEN 1 ELSE 0 END) as semana,
      SUM(CASE WHEN creado_en >= date('now','localtime','start of month') THEN 1 ELSE 0 END) as mes
    FROM leads
  `).get();

  res.json({ leads, contadores });
});

// PATCH /api/leads/:id — actualiza estado
app.patch('/api/leads/:id', (req, res) => {
  const pass = req.headers['x-admin-password'] || req.query.password;
  if (pass !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const { estado } = req.body;
  const estados = ['nuevo', 'contactado', 'cerrado', 'descartado'];
  if (!estados.includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }

  db.prepare('UPDATE leads SET estado = ? WHERE id = ?').run(estado, req.params.id);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Bahía Paraíso backend corriendo en http://localhost:${PORT}`);
});
