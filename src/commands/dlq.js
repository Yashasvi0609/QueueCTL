const JobModel = require("../models/JobModel");

function listDeadJobs() {

    const jobs = JobModel.getDeadJobs();

    if (jobs.length === 0) {

        console.log("✅ Dead Letter Queue is empty.");

        return;
    }

    console.table(
        jobs.map(job => ({
            ID: job.id,
            COMMAND: job.command,
            ATTEMPTS: job.attempts
        }))
    );

}

function retryDeadJob(jobId) {

    const job = JobModel.findById(jobId);

    if (!job) {

        console.log("❌ Job not found.");

        return;

    }

    if (job.state !== "dead") {

        console.log("❌ Job is not in Dead Letter Queue.");

        return;

    }

    JobModel.retryDeadJob(jobId);

    console.log(`🔄 ${jobId} moved back to pending.`);

}

module.exports = {

    listDeadJobs,
    retryDeadJob

};