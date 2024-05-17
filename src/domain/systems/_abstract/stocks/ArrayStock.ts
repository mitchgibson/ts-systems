import { Stock } from "./Stock";

export class ArrayStock<T> extends Stock {
  protected _stock: T[] = [];

  // Add to stock
  public add(values: T[]): void {
    this._stock.push(...values);
  }

  // Draw from stock
  public remove(count: number = 1): T[] {
    return this._stock.splice(0, count);
  }

  public level(): number {
    return this._stock.length;
  }
}
