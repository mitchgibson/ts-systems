import { Application } from "pig-fwk";
import { TokenizerSystem } from "./TokenizerSystem";

export class TokenizerModule {
    constructor(app: Application) {
        app.provide([
            TokenizerSystem
        ]);
    }
}