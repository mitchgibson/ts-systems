export type OutputType = "Data" | "Event" | "Control";

export type Output = {
  name: string;
  type: OutputType;
  value: any;
}