function validateJobInput(input) {
  let job;

  try {
    job = JSON.parse(input);
  } catch (error) {
    throw new Error("Invalid JSON format.");
  }

  if (!job.command || typeof job.command !== "string") {
    throw new Error("Job must contain a valid 'command'.");
  }

  return job;
}

module.exports = {
  validateJobInput,
};