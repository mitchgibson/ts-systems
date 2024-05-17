export const OUTPUT_DATA = "Data";
export const OUTPUT_EVENT = "Event";
export const OUTPUT_CONTROL = "Control";
export const OUTPUT_LOG = "Log";

export type OutputType = typeof OUTPUT_DATA | typeof OUTPUT_EVENT | typeof OUTPUT_CONTROL | typeof OUTPUT_LOG;

export type LogOutputType = "info" | "warning" | "error";

export type MakeLogOutputParams = {type: LogOutputType, message: string, extras?: {error?: Error, [key:string]:any}};

export type LogOutput = {
  type: typeof OUTPUT_LOG;
  value: {
    type: LogOutputType;
    message: string;
    timestamp: number;
    error?: Error;
  };
};

export type DataOutput = {
  type: typeof OUTPUT_DATA;
  value: any;
};

export type EventOutput = {
  type: typeof OUTPUT_EVENT;
  name: string;
  value: any;
};

export type ControlOutput = {
  type: typeof OUTPUT_CONTROL;
  id: string;
  value: any;
};

export type Output = LogOutput | DataOutput | EventOutput | ControlOutput;

export function makeOutput() {
  function makeLogOutput(type: LogOutputType, message: string, extras: {error?: Error, [key:string]:any} = {}): LogOutput {
    return {
      type: OUTPUT_LOG,
      value: {
        type,
        message,
        timestamp: Date.now(),
      },
      ...extras,
    };
  }

  function makeDataOutput(value: any): DataOutput {
    return {
      type: OUTPUT_DATA,
      value,
    };
  }

  function makeEventOutput(name: string, value: any): EventOutput {
    return {
      type: OUTPUT_EVENT,
      name,
      value,
    };
  }

  function makeControlOutput(id: string, value: any): ControlOutput {
    return {
      type: OUTPUT_CONTROL,
      id,
      value,
    };
  }

  return {
    makeLogOutput,
    makeDataOutput,
    makeEventOutput,
    makeControlOutput,
  };
}
