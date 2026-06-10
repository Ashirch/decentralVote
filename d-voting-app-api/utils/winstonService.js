const Winston = require("winston");

const consoleOptions = {
    format: Winston.format.combine(
        Winston.format.timestamp(),
        Winston.format.colorize(),
        Winston.format.printf((info) => {
            return `${info.timestamp} - ${info.level}: ${info.message}`;
        })
    )
};
const fileOptions = {
    filename: "logs.log",
    format: Winston.format.combine(
        Winston.format.timestamp(),
        Winston.format.printf((info) => {
            return `${info.timestamp} - ${info.level}: ${info.message}`;
        })
    )
};
const winstonLogger = Winston.createLogger({
    transports: [
        new Winston.transports.Console(consoleOptions),
        new Winston.transports.File(fileOptions)
    ]
});

const logger = (level = 1, message = "", additionalInfo = "", additionalInfo2 = "", additionalInfo3 = "") => {
    if (additionalInfo && additionalInfo.length)
        message = message + " " + additionalInfo;
    if (additionalInfo2 && additionalInfo2.length)
        message = message + " " + additionalInfo2;
    if (additionalInfo3 && additionalInfo3.length)
        message = message + " " + additionalInfo3;

    switch (level) {
        case 0:
            winstonLogger.error(message);
            break;
        case 1:
            winstonLogger.warn(message);
            break;
        case 2:
            winstonLogger.info(message);
            break;
        case 3:
            winstonLogger.verbose(message);
            break;
        case 4:
            winstonLogger.debug(message);
            break;
        case 5:
            winstonLogger.silly(message);
            break;
    }
};

module.exports = logger;
