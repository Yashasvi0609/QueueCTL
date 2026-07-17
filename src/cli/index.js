#!/usr/bin/env node

const { Command } = require("commander");
const initializeDatabase = require("../database/schema");
const enqueue = require("../commands/enqueue");
const list = require("../commands/list");
const startWorker = require("../commands/worker");
const status = require("../commands/status");
const dlq = require("../commands/dlq");
const config = require("../commands/config");
const stopWorker =
require("../commands/stopWorker");
initializeDatabase();
const program = new Command();

program
  .name("queuectl")
  .description("Production-grade Background Job Queue CLI")
  .version("1.0.0");

  program
  .command("enqueue")
  .description("Add a new job to the queue")
  .argument("<job>", "Job JSON")
  .action(enqueue);
  program
  .command("list")
  .description("List jobs")
  .option("--state <state>", "Filter by state")
  .action(list);
 const workerCommand = program
  .command("worker")
  .description("Worker operations");

workerCommand
  .command("start")
  .description("Start worker(s)")
  .option("--count <number>", "Number of workers", "1")
  .action(async (options) => {
    const count = Number(options.count);

    for (let i = 0; i < count; i++) {
      console.log(`👷 Worker ${i + 1} started`);
      startWorker();
    }
  });

workerCommand
  .command("stop")
  .description("Stop running workers gracefully")
  .action(stopWorker);
  program
  .command("status")
  .description("Show queue summary")
  .action(status);
  const dlqCommand = program
    .command("dlq")
    .description("Dead Letter Queue");

dlqCommand
    .command("list")
    .description("List dead jobs")
    .action(dlq.listDeadJobs);

dlqCommand
    .command("retry")
    .description("Retry dead job")
    .argument("<jobId>")
    .action(dlq.retryDeadJob);
const configCommand = program
.command("config")
.description("Configuration");

configCommand
.command("get")
.description("Show configuration")
.action(config.getConfig);

configCommand
.command("set")
.description("Update configuration")
.argument("<key>")
.argument("<value>")
.action(config.setConfig);

program.parse();