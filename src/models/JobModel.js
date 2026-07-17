const db = require("../database/database");

class JobModel {
  create(job) {
    const stmt = db.prepare(`
      INSERT INTO jobs (
        id,
        command,
        state,
        attempts,
        max_retries,
        next_run_at,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      job.id,
      job.command,
      job.state,
      job.attempts,
      job.max_retries,
      job.next_run_at,
      job.created_at,
      job.updated_at
    );
  }

getAll(state = null) {
  if (state) {
    const stmt = db.prepare(
      "SELECT * FROM jobs WHERE state = ? ORDER BY created_at DESC"
    );
    return stmt.all(state);
  }

  const stmt = db.prepare(
    "SELECT * FROM jobs ORDER BY created_at DESC"
  );

  return stmt.all();
}
}
module.exports = new JobModel();
