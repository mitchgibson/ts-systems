export const INPUT_DATA = "Data";
export const INPUT_EVENT = "Event";
export const INPUT_CONTROL = "Control";

export type InputType = typeof INPUT_DATA | typeof INPUT_EVENT | typeof INPUT_CONTROL;

export type DataInput = {
  type: typeof INPUT_DATA;
  value: any;
};

export type EventInput = {
  type: typeof INPUT_EVENT;
  name: string;
  value: any;
};

export type ControlInput = {
  type: typeof INPUT_CONTROL;
  id: string;
  value: any;
};

export type Input = DataInput | EventInput | ControlInput;

export function makeInput() {
  function makeDataInput(value: any): DataInput {
    return {
      type: INPUT_DATA,
      value,
    };
  }

  function makeEventInput(name: string, value: any): EventInput {
    return {
      type: INPUT_EVENT,
      name,
      value,
    };
  }

  function makeControlInput(id: string, value: any): ControlInput {
    return {
      type: INPUT_CONTROL,
      id,
      value,
    };
  }

  return {
    makeDataInput,
    makeEventInput,
    makeControlInput,
  };
}
