const WorkerManager = require("../workers/WorkerManager");

async function startWorker() {
    const manager = new WorkerManager();
    await manager.start();
}

module.exports = startWorker;