import winston from "winston";
import fs from "fs";

if(!fs.existsSync("tests/test-reports")){
    fs.mkdirSync("tests/test-reports", { recursive: true});
}
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({
            format: () => {
                const n = new Date();
                const pad = (v: number) => String(v).padStart(2, '0');
                return `${pad(n.getDate())}_${pad(n.getMonth() + 1)}_${n.getFullYear()}_${pad(n.getHours())}_${pad(n.getMinutes())}_${pad(n.getSeconds())}`;
            }
        }),
        winston.format.errors({stact: true}),
        winston.format.printf(({ timestamp, level, message, stack }) => {
            return `${timestamp} [${level.toUpperCase()}] ${stack || message}`;
        })
    ),
    transports: [
        new winston.transports.File({
            filename: "tests/test-reports/log.log"
        }),
    ]
});

export default logger;