const JobModel = require("../models/JobModel");

function status() {
  const rows = JobModel.getStatus();

  const summary = {
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0,
    dead: 0,
  };

  rows.forEach((row) => {
    summary[row.state] = row.count;
  });

  console.log("\n📊 Queue Status");
  console.log("-----------------------");
  console.log(`Pending     : ${summary.pending}`);
  console.log(`Processing  : ${summary.processing}`);
  console.log(`Completed   : ${summary.completed}`);
  console.log(`Failed      : ${summary.failed}`);
  console.log(`Dead        : ${summary.dead}`);
}

module.exports = status;