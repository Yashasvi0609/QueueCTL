const WorkerService = require("../services/WorkerService");
const ConfigModel = require("../models/ConfigModel");

class WorkerManager {
  constructor() {
    this.running = true;
  }

  async start() {
    // Reset stop flag whenever a worker starts
    ConfigModel.set("worker_stop", "false");

    console.log("🚀 Worker is running...");

    while (this.running) {
      // Check if a graceful shutdown has been requested
      if (ConfigModel.get("worker_stop") === "true") {
        console.log("\n🛑 Graceful shutdown requested...");
        break;
      }

      // Process the next available job
      await WorkerService.processNextJob();

      // Wait 1 second before checking again
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("✅ Worker stopped gracefully.");
  }
}

module.exports = WorkerManager;