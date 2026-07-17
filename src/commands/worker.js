const WorkerManager = require("../workers/WorkerManager");
const PidManager = require("../utils/PidManager");
async function startWorker() {
  const manager = new WorkerManager();

  await manager.start();
}

module.exports = startWorker;