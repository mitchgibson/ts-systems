import { from, Observable, Subject } from "rxjs";
import { ControlInput, EventInput, Input } from "./inputs/Input";
import { DataOutput, LogOutput, LogOutputType, makeOutput } from "./outputs/Output";
import { Stock } from "./stocks/Stock";
import { ControlSet } from "./controls/Control";

export abstract class System {
  // Controls
  // Mutable properties of the system that can be changed
  protected controls: ControlSet = {};
  protected logOutputSubject: Subject<LogOutput> = new Subject();
  protected dataOutputSubject: Subject<DataOutput> = new Subject();

  protected makeLogOutput = makeOutput().makeLogOutput;

  public observeData: Observable<DataOutput> = this.dataOutputSubject.asObservable();
  public observeLog: Observable<LogOutput> = this.logOutputSubject.asObservable();

  // Constants
  // Properties of the system that cannot change

  // Connections
  // Types: Inbound, Outbound, Bidirectional
  // Provides ports for receiving Inputs and sending Outputs
  // TODO: Implement connections

  // Inputs
  // Types: Data, Event, Control
  public dataBuffer: Input[] = [];
  public data(inputs: Input[]): void {
    this.dataBuffer.push(...inputs);
  }

  // Handles control inputs instantly
  public control(input: ControlInput): void {
    this.controls[input.id].value = input.value;
  }

  public event(input: EventInput): void {
    this.log("info", `Event received: ${input.name}`, { value: input });
  }

  // Outputs
  // Types: Data, Event, Control
  public outputData(outputs: DataOutput[]): void {
    from(outputs).subscribe((output) => this.dataOutputSubject.next(output));
  }

  protected log(type: LogOutputType, message: string, extras?: {}): void {
    const log = this.makeLogOutput(type, message, extras);
    this.logOutputSubject.next(log);
  }

  // Behaviors
  // What the system dows with inputs, outputs, and connections
  // The system gains inputs from connections
  // The system sends outputs to connections
  // The system can have multiple behaviors
  // Behaviors can be added, removed, and modified, depending on input conditions
  // These are private methods of the system class

  // Stocks
  // Buffers that the system add to and draws from
  protected stocks: { [id: string]: Stock } = {};

  // Actions
  // Methods that can be called on the system
  public abstract start(): void;
  public abstract stop(): void;
  public reset(): void {
    this.dataBuffer = [];
    this.stocks = {};
  }
}
