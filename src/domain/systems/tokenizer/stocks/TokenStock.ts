import { Stock } from "../../_abstract/stocks/Stock";

export class TokenStock extends Stock {
    private tokens: string[] = []

    constructor() {
        super("token_stock");
    }

    public add(tokens:string[]): void {
        this.tokens.push(...tokens);
    }

    public remove(index:number, amount:number): string[] {
        return this.tokens.splice(index, amount);
    }

    public level(): number {
        return this.tokens.length;
    }
}