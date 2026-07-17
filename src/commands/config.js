const ConfigModel = require("../models/ConfigModel");

function getConfig() {

    console.table(
        ConfigModel.getAll()
    );

}

function setConfig(key,value){

    ConfigModel.set(key,value);

    console.log(`✅ ${key} updated to ${value}`);

}

module.exports = {

    getConfig,
    setConfig

};