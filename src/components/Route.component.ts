import { Container, RouterSlot } from "pig-fwk";

export class Root extends Container {
  constructor() {
    super();
    this.fillScreen();
    this.cssClass(["bg-orange-50", "text-green-800"]);
    this.children([this.headerSlot(), this.contentLayout()]);
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
