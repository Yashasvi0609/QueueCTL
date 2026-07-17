const JobModel = require("../models/JobModel");
const WorkerService = require("../services/WorkerService");

function startWorker() {

  const job = JobModel.getPendingJob();

  if (!job) {

    console.log("📭 No pending jobs.");

    return;
  }

  const locked = JobModel.lockJob(job.id);

  if (!locked) {

    console.log("⚠️ Job already picked by another worker.");

    return;
  }

  WorkerService.processJob(job);

}

module.exports = startWorker;