import { Application } from "pig-fwk";
import { TokenStockSystem } from "./TokenizerSystem";

export class TokenizerModule {
    constructor(app: Application) {
        app.provide([
            TokenStockSystem
        ]);
    }
}