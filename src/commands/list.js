const JobModel = require("../models/JobModel");

function list(options) {
  const jobs = JobModel.getAll(options.state);

  if (jobs.length === 0) {
    console.log("No jobs found.");
    return;
  }

  console.table(
    jobs.map((job) => ({
      ID: job.id,
      STATE: job.state,
      COMMAND: job.command,
      ATTEMPTS: job.attempts,
    }))
  );
}

module.exports = list;