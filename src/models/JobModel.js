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
}

module.exports = new JobModel();