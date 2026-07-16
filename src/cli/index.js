#!/usr/bin/env node

const { Command } = require("commander");
const initializeDatabase = require("../database/schema");
initializeDatabase();
const program = new Command();

program
  .name("queuectl")
  .description("Production-grade Background Job Queue CLI")
  .version("1.0.0");

program.parse();