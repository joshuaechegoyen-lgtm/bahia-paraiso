const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const db = new DatabaseSync(path.join(__dirname, 'leads.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mensualidad TEXT NOT NULL,
    uso TEXT NOT NULL,
    plazo TEXT NOT NULL,
    estado TEXT NOT NULL DEFAULT 'nuevo',
    creado_en TEXT DEFAULT (datetime('now','localtime'))
  )
`);

module.exports = db;
