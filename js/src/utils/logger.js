/* import winston from "winston";
import program from "./commander.js";


const loggerType = program.opts().enviroment

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "bold red",
    error: "red",
    warning: "yellow",
    info: "blue",
    http: "cyan",
    debug: "white",
  },
};

const logger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
        level: loggerType.toUpperCase() === "DEVELOPMENT" ? "debug" : "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
        filename: "errors.log",
        level: "error",
        format: winston.format.simple(),
      })
  ],
});

export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(
    `${req.method} ${req.url} - ${new Date().toLocaleDateString()}`
  );
  next();
};
 */