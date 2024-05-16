export type InputType = "Data" | "Event" | "Control";

export type Input = {
    name: string;
    type: InputType;
    value: any;
}