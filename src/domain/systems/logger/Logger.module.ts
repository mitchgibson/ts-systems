import { Application } from "pig-fwk";
import { LoggerSystem } from "./LoggerSystem";

// TODO: take config with concrete logger
// TODO: make interface for logger
export class LoggerModule {
    constructor(app: Application) {
        app.provide([
            LoggerSystem
        ]);
    }
}