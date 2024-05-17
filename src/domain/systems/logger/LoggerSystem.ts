import { Inject } from "pig-fwk";
import { System } from "../_abstract/System";
import { TokenStockSystem } from "../tokenizer/TokenizerSystem";
import { LogOutput } from "../_abstract/outputs/Output";
import { Subscription } from "rxjs";
import { format } from "date-fns";

// TODO: add concrete logger interface to contructor
export class LoggerSystem extends System {
  private tokenizerSystem = Inject<TokenStockSystem>(TokenStockSystem);
  private logSubscription?: Subscription;

  constructor() {
    super();
  }

  public start(): void {
    this.logSubscription = this.tokenizerSystem.observeLog.subscribe((log: LogOutput) => {
      this[log.value.type](log);
    });
  }

  public stop(): void {
    this.logSubscription?.unsubscribe();
  }

  public info(log: LogOutput): void {
    console.log(log.value.message, format(log.value.timestamp, "yyyy-MM-dd HH:mm:ss"));
  }

  public warning(log: LogOutput): void {
    console.warn(log.value.message, log.value.timestamp);
  }

  public error(log: LogOutput): void {
    console.error(log.value.message, log.value.timestamp, log.value.error);
  }
}
