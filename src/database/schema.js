const db = require("./database");

function initializeDatabase() {
  // Jobs table
  db.exec(`
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      command TEXT NOT NULL,
      state TEXT NOT NULL,
      attempts INTEGER DEFAULT 0,
      max_retries INTEGER DEFAULT 3,
      next_run_at INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  // Configuration table
  db.exec(`
    CREATE TABLE IF NOT EXISTS config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);
db.prepare(`
CREATE TABLE IF NOT EXISTS config (

    key TEXT PRIMARY KEY,
    value TEXT

)
`).run();
db.prepare(`
INSERT OR IGNORE INTO config(key,value)
VALUES
('max_retries','3'),
('backoff_base','2')
`).run();
db.prepare(`
INSERT OR IGNORE INTO config
VALUES ('worker_stop','false')
`).run();

  console.log("✅ Database initialized");
}

module.exports = initializeDatabase;