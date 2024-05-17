import { Application } from "pig-fwk";
import { TokenizerSystem } from "./TokenizerSystem";

export class TokenizerSystemModule {
    constructor(app: Application) {
        app.provide([
            TokenizerSystem
        ]);
    }
}