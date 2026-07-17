const { v4: uuidv4 } = require("uuid");
const JobModel = require("../models/JobModel");
const { validateJobInput } = require("../utils/validation");

function enqueue(jobInput) {
  try {
    const input = validateJobInput(jobInput);

    const now = new Date().toISOString();

    const job = {
      id: input.id || uuidv4(),
      command: input.command,
      state: "pending",
      attempts: 0,
      max_retries: input.max_retries || 3,
      next_run_at: 0,
      created_at: now,
      updated_at: now,
    };

    JobModel.create(job);

    console.log("✅ Job added successfully.");
    console.log(job);
  } catch (error) {
    console.error("❌", error.message);
  }
}

module.exports = enqueue;