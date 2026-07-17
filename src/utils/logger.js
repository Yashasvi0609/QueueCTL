const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(
    __dirname,
    "../../logs/worker.log"
);

function log(message) {
    const time = new Date().toISOString();

    fs.appendFileSync(
        LOG_FILE,
        `[${time}] ${message}\n`
    );
}

module.exports = { log };