import { Stock } from "../../_abstract/stocks/Stock";

export type TokenBehaviorContext = {
    stock: Stock;
}

export function useTokenBehavior(context: TokenBehaviorContext) {
    
    function storeTokens(tokens:string[]) {
        context.stock.add(tokens);
    }

    function removeTokens(): string | undefined {
        if(context.stock.level() === 0) return undefined;
        return context.stock.remove(context.stock.level() - 1);
    }

    return {
        storeTokens,
        removeTokens
    };
}