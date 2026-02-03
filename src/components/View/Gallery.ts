import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface IGallery {
    content: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
    gallery: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.gallery = ensureElement<HTMLElement>('gallery', this.container);
    }

    set content(content: HTMLElement[]) {
        content.forEach(item => {
            this.gallery.appendChild(item);
        })
    }
}

