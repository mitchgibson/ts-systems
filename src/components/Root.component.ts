import { Container, Inject, RouterSlot } from "pig-fwk";
import { TokenizerSystem } from "../domain/systems/tokenizer/TokenizerSystem";

export class Root extends Container {
  private tokenizerSystem = Inject(TokenizerSystem);

  constructor() {
    super();
    this.fillScreen();
    this.cssClass(["bg-orange-50", "text-gray-600"]);
    this.children([this.headerSlot(), this.contentLayout()]);
    this.tokenizerSystem.start();
  }

  private headerSlot(): RouterSlot {
    return new RouterSlot("header");
  }

  private contentLayout(): Container {
    return new Container()
      .flexGrow()
      .itemsCenter()
      .justifyCenter()
      .cssClass(["py-4", "overflow-hidden"])
      .children([new Container().row().flexGrow().fillWidth().justifyCenter().cssClass(["overflow-auto"]).itemsCenter().children([this.contentSlot()])]);
  }
  private contentSlot(): RouterSlot {
    return new RouterSlot("content").cssClass(["w-full", "h-full"]);
  }
}
