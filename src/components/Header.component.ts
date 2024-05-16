import { Component, Container } from "pig-fwk";

export class Header extends Container {

    constructor() {
        super();
        this.css();
        this.setup();
        this.build();
    }

    private css() {
        this.cssClass([])
            .row()
            .justifyBetween()
            .itemsCenter()
    }

    private setup() {}

    private build() {
        this.children([
            new Component().content("Systems Visualized").cssClass(["h-16", "text-xl", "font-semibold", "px-6", "py-4"]),
        ])
    }
}