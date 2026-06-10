const CONFIG = require("./config/config");
const flatten = require('flat');
const unflatten = require('flat').unflatten;

const populateConfigFile = (envObj) => {
    const flatConfig = flatten(CONFIG);
    for (const key in flatConfig) {
        if (flatConfig[key] in envObj) {
            flatConfig[key] = envObj[flatConfig[key]];
        }
    }
    const obj = unflatten(flatConfig);
    for (const key in CONFIG) {
        CONFIG[key] = obj[key];
    }
};

const runServerFile = () => {
    require("./server.js");
};

const startServer = async () => {
    // populateConfigFile(envObj);
    runServerFile();
};

startServer();