const ConfigModel = require("../models/ConfigModel");

function stopWorker() {

    ConfigModel.set(
        "worker_stop",
        "true"
    );

    console.log(
        "🛑 Worker stop requested."
    );

}

module.exports = stopWorker;