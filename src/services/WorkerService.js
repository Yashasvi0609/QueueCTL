const { exec } = require("child_process");
const JobModel = require("../models/JobModel");
const ConfigModel = require("../models/ConfigModel");

class WorkerService {
  async processNextJob() {
    const job = JobModel.getPendingJob();

    if (!job) {
      return;
    }

    const locked = JobModel.lockJob(job.id);

    if (!locked) {
      return;
    }

    console.log(`🚀 Processing Job: ${job.id}`);

    return new Promise((resolve) => {
      exec(job.command, (error) => {
        if (error) {
          console.log(`❌ Job Failed: ${job.id}`);

          JobModel.incrementAttempts(job.id);

          const updatedJob = JobModel.findById(job.id);

          if (updatedJob.attempts >= updatedJob.max_retries) {
            console.log("☠️ Moved to Dead Letter Queue");

            JobModel.moveToDead(job.id);
          } else {
            const base = Number(
              ConfigModel.get("backoff_base")
            );

            const delay = Math.pow(
              base,
              updatedJob.attempts
            );

            const nextRun =
              Date.now() + delay * 1000;

            JobModel.updateNextRun(
              job.id,
              nextRun
            );

            JobModel.moveToPending(job.id);

            console.log(
              `🔄 Retry in ${delay} seconds`
            );
          }

          return resolve();
        }

        console.log(`✅ Job Completed: ${job.id}`);

        JobModel.updateState(
          job.id,
          "completed"
        );

        JobModel.clearNextRun(job.id);

        resolve();
      });
    });
  }
}

module.exports = new WorkerService();