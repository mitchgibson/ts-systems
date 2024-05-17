import { ControlSet, makeControl } from "../_abstract/controls/Conrol";
import { Input } from "../_abstract/inputs/Input";
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
    console.log("TokenizerSystem initialized");
  }

  private getChunk(): Input[] {
    const chunk = this.inputBuffer.splice(0, this.controls.inputLimit.value || this.inputBuffer.length);
    console.log(`${chunk.length} tokens to process from stock (${this.getLevel()} tokens)`);
    return chunk;
  }

  private outputTokens(): void {
    console.log(`Threshold (${this.controls.threshold.value}) exceeded`);
    console.log(`Drawing ${this.controls.drawRate.value} tokens from stock`);
    const sockLevel = this.stocks["token_stock"].level();
    let startDrawIndex = sockLevel - this.controls.drawRate.value - 1;
    startDrawIndex = startDrawIndex < 0 ? 0 : startDrawIndex;
    const tokens = this.stocks["token_stock"].remove(startDrawIndex, this.controls.drawRate.value);
    console.log(`Outputting ${tokens.length} tokens`);
    this.output(tokens.map((token: string) => ({ data: token })));
  }

  private getLevel(): number {
    const level = this.stocks["token_stock"].level();
    console.log(`${this.inputBuffer.length} tokens remaining in buffer`);
    return level;
  }

  private storeTokens(inputs: Input[]): void {
    console.log(`Storing ${inputs.length} tokens in stock`);
    this.storageBehavior.storeTokens(inputs.map((input) => input.value));
  }

  public start(): void {
    console.log("TokenizerSystem started");
    this.runner = setInterval(() => {
      const chunk = this.getChunk();
      const level = this.getLevel();

      console.log(`${this.inputBuffer.length} tokens remaining in buffer`);

      if (level > this.controls.threshold.value) {
        this.outputTokens();
      }
      this.storeTokens(chunk);
    }, this.controls.interval.value);
  }
  public stop(): void {
    console.log("TokenizerSystem stopped");
    if (this.runner) {
      clearInterval(this.runner);
    }
  }
  public reset(): void {
    console.log("TokenizerSystem reset");
    this.stocks = {
      token_stock: [] as string[],
    };
  }
}
