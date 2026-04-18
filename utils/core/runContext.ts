import fs from "fs";
import path from "path";

const RUN_ID_FILE = path.join(process.cwd(), "test-reports", "runId.txt");

// set runId (only once)
export const setRunId = (id: string) => {
    if (!fs.existsSync(RUN_ID_FILE)) {
        fs.mkdirSync(path.dirname(RUN_ID_FILE), { recursive: true });
        fs.writeFileSync(RUN_ID_FILE, id);
    }
};

// get runId (shared across threads)
export const getRunId = (): string => {
    if (!fs.existsSync(RUN_ID_FILE)) {
        throw new Error("RUN_ID not initialized");
    }
    return fs.readFileSync(RUN_ID_FILE, "utf-8");
};