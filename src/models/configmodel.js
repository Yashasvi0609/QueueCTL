const db = require("../database/database");

class ConfigModel {

    get(key) {

        const stmt = db.prepare(
            "SELECT value FROM config WHERE key=?"
        );

        const row = stmt.get(key);

        return row ? row.value : null;

    }

    set(key,value){

        const stmt = db.prepare(`
            UPDATE config
            SET value=?
            WHERE key=?
        `);

        stmt.run(value,key);

    }

    getAll(){

        const stmt = db.prepare(
            "SELECT * FROM config"
        );

        return stmt.all();

    }

}

module.exports = new ConfigModel();