const fs = require("fs");
const path = require("path");

const PID_DIR = path.join(process.cwd(), "runtime");
const PID_FILE = path.join(PID_DIR, "worker.pid");


class PidManager {

    static exists() {
        return fs.existsSync(PID_FILE);
    }


    static create() {

        if (!fs.existsSync(PID_DIR)) {
            fs.mkdirSync(PID_DIR);
        }

        fs.writeFileSync(
            PID_FILE,
            process.pid.toString()
        );
    }


    static remove() {

        if (fs.existsSync(PID_FILE)) {
            fs.unlinkSync(PID_FILE);
        }
    }


    static getPid() {

        if(this.exists()) {
            return fs.readFileSync(PID_FILE,"utf8");
        }

        return null;
    }
}


module.exports = PidManager;