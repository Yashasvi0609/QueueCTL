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

getPendingJob() {

  const currentTime = Date.now();

  const stmt = db.prepare(`
    SELECT *
    FROM jobs
    WHERE state = 'pending'
      AND next_run_at <= ?
    ORDER BY created_at
    LIMIT 1
  `);

  return stmt.get(currentTime);
}

updateState(id, state) {
  const stmt = db.prepare(`
    UPDATE jobs
    SET state=?,
        updated_at=?
    WHERE id=?
  `);

  stmt.run(
    state,
    new Date().toISOString(),
    id
  );
}
incrementAttempts(id) {
  const stmt = db.prepare(`
    UPDATE jobs
    SET attempts = attempts + 1,
        updated_at = ?
    WHERE id = ?
  `);

  stmt.run(
    new Date().toISOString(),
    id
  );
}
findById(id) {
  const stmt = db.prepare(`
    SELECT *
    FROM jobs
    WHERE id = ?
  `);

  return stmt.get(id);
}
moveToPending(id) {
  const stmt = db.prepare(`
    UPDATE jobs
    SET state='pending',
        updated_at=?
    WHERE id=?
  `);

  stmt.run(
    new Date().toISOString(),
    id
  );
}
moveToDead(id) {
  const stmt = db.prepare(`
    UPDATE jobs
    SET state='dead',
        updated_at=?
    WHERE id=?
  `);

  stmt.run(
    new Date().toISOString(),
    id
  );
}
updateNextRun(id, nextRunAt) {
  const stmt = db.prepare(`
    UPDATE jobs
    SET next_run_at = ?,
        updated_at = ?
    WHERE id = ?
  `);

  stmt.run(
    nextRunAt,
    new Date().toISOString(),
    id
  );
}
clearNextRun(id) {
  const stmt = db.prepare(`
    UPDATE jobs
    SET next_run_at = 0
    WHERE id = ?
  `);

  stmt.run(id);
}
lockJob(id) {

  const stmt = db.prepare(`
    UPDATE jobs
    SET state='processing',
        updated_at=?
    WHERE id=?
      AND state='pending'
  `);

  const result = stmt.run(
    new Date().toISOString(),
    id
  );

  return result.changes === 1;
}
getStatus() {
  const stmt = db.prepare(`
    SELECT state, COUNT(*) as count
    FROM jobs
    GROUP BY state
  `);

  return stmt.all();
}
getDeadJobs() {

    const stmt = db.prepare(`
        SELECT *
        FROM jobs
        WHERE state='dead'
        ORDER BY updated_at DESC
    `);

    return stmt.all();

}
retryDeadJob(id) {

    const stmt = db.prepare(`
        UPDATE jobs
        SET
            state='pending',
            attempts=0,
            next_run_at=0,
            updated_at=?
        WHERE id=?
    `);

    stmt.run(
        new Date().toISOString(),
        id
    );

}

}
module.exports = new JobModel();
