#!/usr/bin/env node

const { Command } = require("commander");
const initializeDatabase = require("../database/schema");
const enqueue = require("../commands/enqueue");
const list = require("../commands/list");
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
program.parse();