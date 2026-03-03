import dotenv from "dotenv";
import { decrypt } from "./encryption";

dotenv.config();

export const config = {
    baseURL: process.env.BASE_URL!,
    env: process.env.ENV || "qa",

    browser: process.env.BROWSER || "chromium",
    headless: process.env.HEADLESS === "true",
    slowMo: Number(process.env.SLOW_MO) || 0,

    defaultTimeout: Number(process.env.DEFAULT_TIMEOUR) || 30000,
    navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT) || 60000,

    screenshotEachStep: process.env.SCREENSHOT_EACH_STEP === "true",
    screenshotOnFailure: process.env.SCREENSHOT_ON_FAILURE === "true"
};