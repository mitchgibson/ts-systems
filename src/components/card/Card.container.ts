import { Container } from "pig-fwk";

export class Card extends Container {
  constructor() {
    super();
    this.css();
    // this.setup();
    // this.build();
  }

  private css() {
    this.cssClass(["bg-white", "border", "border-gray-600", "rounded-lg", "p-4", "m-4", "w-64", "h-64"]).row().justifyBetween().itemsCenter();
    this.cssClass(["hover:bg-violet-100", "hover:shadow-2xl"]);
    this.col().justifyCenter().itemsCenter();
  }
}
