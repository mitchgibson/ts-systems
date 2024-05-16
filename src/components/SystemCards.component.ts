import { Container } from "pig-fwk";
import { Card } from "./card/Card.container";

export class SystemCards extends Container {
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

        this.cssClass(["gap-4", "p-4"]).fill()
    }

    private setup() {}

    private build() {
        this.children([
            new Card(),
            new Card(),
            new Card()
        ]);
    }
}