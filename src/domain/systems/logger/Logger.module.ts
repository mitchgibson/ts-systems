import { Application } from "pig-fwk";
import { LoggerSystem } from "./LoggerSystem";

export class LoggerModule {
    constructor(app: Application) {
        app.provide([
            LoggerSystem
        ]);
    }
}