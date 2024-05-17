import { ControlSet, makeControl } from "../_abstract/controls/Control";
import { DataInput } from "../_abstract/inputs/Input";
import { System } from "../_abstract/System";
import { useTokenBehavior } from "./behaviors/StoreToken";
import { TokenStock } from "./stocks/TokenStock";

export class TokenizerSystem extends System {
  public controls: ControlSet = {
    interval: makeControl<number>(1000, {
      onChange: () => {
        this.stop();
        this.start();
      },
    }),
    threshold: makeControl<number>(100),
    drawRate: makeControl<number>(10),
    inputLimit: makeControl<number>(10),
  };

  private runner?: number;
  protected stocks: { [id: string]: any } = {
    token_stock: new TokenStock(),
  };
  private storageBehavior = useTokenBehavior({ stock: this.stocks["token_stock"] });

  constructor() {
    super();
  }

  private getChunk(): DataInput[] {
    const chunk = this.dataBuffer.splice(0, this.controls.inputLimit.value || this.dataBuffer.length);
    return chunk as DataInput[];
  }

  private outputTokens(): void {
    const sockLevel = this.stocks["token_stock"].level();
    let startDrawIndex = sockLevel - this.controls.drawRate.value - 1;
    startDrawIndex = startDrawIndex < 0 ? 0 : startDrawIndex;
    const tokens = this.stocks["token_stock"].remove(startDrawIndex, this.controls.drawRate.value);
    this.outputData(tokens.map((token: string) => ({ data: token })));
  }

  private getLevel(): number {
    const level = this.stocks["token_stock"].level();
    return level;
  }

  private storeTokens(inputs: DataInput[]): void {
    this.storageBehavior.storeTokens(inputs.map((input) => input.value));
  }

  public start(): void {
    this.log("info", "TokenizerSystem started");
    this.runner = setInterval(() => {
      const chunk = this.getChunk();
      const level = this.getLevel();

      if (level > this.controls.threshold.value) {
        this.outputTokens();
      }
      this.storeTokens(chunk);

      // console.log(`Stock level: ${this.stocks["token_stock"].level()}`);
      this.log("info", `Stock Level: ${this.stocks["token_stock"].level()}`);
    }, this.controls.interval.value);
  }
  public stop(): void {
    this.log("info", "TokenizerSystem stopped");
    if (this.runner) {
      clearInterval(this.runner);
    }
  }
  public reset(): void {
    this.log("info", "TokenizerSystem reset");
    this.stocks = {
      token_stock: [] as string[],
    };
  }
}
