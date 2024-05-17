import { Observable, Subject } from "rxjs";
import { Input } from "./inputs/Input";
import { Output } from "./outputs/Output";
import { Stock } from "./stocks/Stock";
import { ControlSet } from "./controls/Conrol";

export abstract class System {
    // Controls
    // Mutable properties of the system that can be changed
    protected controls: ControlSet = {};
    protected outputSubject:Subject<Output[]> = new Subject();

    public observeOutput:Observable<Output[]> = this.outputSubject.asObservable();

    // Constants
    // Properties of the system that cannot change
    
    // Connections
    // Types: Inbound, Outbound, Bidirectional
    // Provides ports for receiving Inputs and sending Outputs
    // TODO: Implement connections
    
    // Inputs
    // Types: Data, Event, Control
    public inputBuffer: Input[] = [];
    public input(inputs: Input[]): void {
        this.inputBuffer.push(...inputs);
    }

    // Outputs
    // Types: Data, Event, Control
    public outputBuffer: Output[] = [];
    public output(outputs: Output[]): void {
        this.outputSubject.next(outputs);
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
    protected stocks: {[id:string]: Stock} = {};

    // Actions
    // Methods that can be called on the system
    public abstract start(): void;
    public abstract stop(): void;
    public abstract reset(): void;
}