import { Container, Inject, NumberInput } from "pig-fwk";
import { Card } from "./card/Card.container";
import { TokenizerSystem } from "../domain/systems/tokenizer/TokenizerSystem";
import { DataInput, makeInput } from "../domain/systems/_abstract/inputs/Input";

export class SystemCards extends Container {
  private tokenizerSystem = Inject<TokenizerSystem>(TokenizerSystem);
  private makeDataInput = makeInput().makeDataInput;
  private add10 = new Card().content("Add 10");
  private add100 = new Card().content("Add 100");
  private controls = new Card().children([
    new NumberInput()
      .attribute("placeholder", "Interval")
      .value(this.tokenizerSystem.controls.interval.value)
      .min(100)
      .step(100)
      .change((component, event: any) => {
        if (!event.target) return;
        this.tokenizerSystem.controls.interval.value = event.target.valueAsNumber;
      }),
    new NumberInput()
      .attribute("placeholder", "Threshold")
      .value(this.tokenizerSystem.controls.threshold.value)
      .min(0)
      .change((component, event: any) => {
        if (!event.target) return;
        this.tokenizerSystem.controls.threshold.value = event.target.valueAsNumber;
      }),
    new NumberInput()
      .attribute("type", "number")
      .attribute("placeholder", "Draw Rate")
      .value(this.tokenizerSystem.controls.drawRate.value)
      .min(0)
      .change((component, event: any) => {
        if (!event.target) return;
        this.tokenizerSystem.controls.drawRate.value = event.target.valueAsNumber;
      }),
    new NumberInput()
      .attribute("placeholder", "Input Limit")
      .value(this.tokenizerSystem.controls.inputLimit.value)
      .min(0)
      .change((component, event: any) => {
        if (!event.target) return;
        this.tokenizerSystem.controls.inputLimit.value = event.target.valueAsNumber;
      }),
  ]);

  constructor() {
    super();
    this.css();
    this.setup();
    this.build();
  }

  private css() {
    this.fill();
    this.itemsCenter();
    this.justifyCenter();
    this.row();

    this.cssClass(["gap-4", "p-4"]).fill();

    this.add10.cssClass(["cursor-pointer"]);
    this.controls.cssClass(["gap-y-2"]);
    this.controls.getChildren().forEach((child) => {
      child.cssClass(["w-48", "rounded", "bg-white", "text-gray-600", "p-2"]);
    });
  }

  private setup() {
    this.add10.event("click", () => {
      console.log("Adding 10 tokens");
      let index: number = 0;
      const tokens: DataInput[] = Array.from({ length: 10 }, () => {
        return this.makeDataInput(`Token ${index++}`);
      });
      this.tokenizerSystem.data(tokens);
    });

    this.add100.event("click", () => {
      console.log("Adding 100 tokens");
      let index: number = 0;
      const tokens: DataInput[] = Array.from({ length: 100 }, () => {
        return this.makeDataInput(`Token ${index++}`);
      });
      this.tokenizerSystem.data(tokens);
    });
  }

  private build() {
    this.children([this.add10, this.add100, this.controls]);
  }
}
