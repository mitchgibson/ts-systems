
export abstract class Stock {
    
    constructor(public readonly id: string) {}

    public abstract add(...args:any[]): void;

    public abstract remove(...args:any[]): any;

    public abstract level(): number;
}