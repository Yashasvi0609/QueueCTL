#!/usr/bin/env node

const { Command } = require("commander");
const initializeDatabase = require("../database/schema");
const enqueue = require("../commands/enqueue");
const list = require("../commands/list");
const startWorker = require("../commands/worker");
const status = require("../commands/status");
const dlq = require("../commands/dlq");
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
 program
  .command("worker")
  .description("Worker operations")
  .command("start")
  .description("Start worker(s)")
  .option("--count <number>", "Number of workers", "1")
  .action((options) => {

    const count = Number(options.count);

    for (let i = 0; i < count; i++) {

      console.log(`👷 Worker ${i + 1} started`);

      startWorker();

    }

  });
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
    
program.parse();