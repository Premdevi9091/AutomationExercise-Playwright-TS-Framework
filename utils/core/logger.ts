import winston, { Logger } from "winston";
import fs from "fs";
import path from "path";

let currentLogger: Logger;

export function initLogger(runId: string, scenarioName: string) {
    const logDir = path.join("test-reports", runId, "Scenarios", scenarioName);
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    currentLogger = winston.createLogger({
        level: "info",
        format: winston.format.combine(
            winston.format.timestamp({
                format: () => {
                    const n = new Date();
                    const pad = (v: number) => String(v).padStart(2, '0');
                    return `${pad(n.getFullYear())}-${pad(n.getMonth() + 1)}-${n.getDate()}_${pad(n.getHours())}_${pad(n.getMinutes())}_${pad(n.getSeconds())}`;
                }
            }),
            winston.format.errors({ stack: true }),
            winston.format.printf(({ timestamp, level, message, stack }) => {
                return `${timestamp} [${level.toUpperCase()}] ${stack || message}`;
            })
        ),
        transports: [
            new winston.transports.File({
                filename: path.join(logDir, "log.log")
            }),
        ]
    });
}

//global accessor (used everywhere)
const logger = {
    info: (msg: string) => currentLogger?.info(msg),
    error: (msg: string) => currentLogger?.error(msg),
    warn: (msg: string) => currentLogger?.warn(msg),
    debug: (msg: string) => currentLogger?.debug(msg),
};

export default logger;