import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { CDN_URL } from "../../utils/constants";

interface ICardActions {
    onClick?: () => void;
}



class Product<T> extends Component<IProduct & T> {
    productTitle: HTMLHeadingElement;
    productPrice: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.productTitle = ensureElement<HTMLHeadingElement>('.card__title', this.container);
        this.productPrice = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set title(title: string) {
        this.productTitle.textContent = title;
    }
    set price(price: number | null) {
        if (typeof price === 'number') {
             this.productPrice.textContent = String(price) + ' синапсов';
        }
        else this.productPrice.textContent = 'Бесценно';
    }
}

export class ProductGalleryView extends Product<IProduct> {

    productOpenCardButton: HTMLButtonElement;
    productCategory: HTMLElement;
    productImage: HTMLImageElement;
    
    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);
        this.productOpenCardButton = this.container as HTMLButtonElement;
        this.productCategory = ensureElement<HTMLElement>('.card__category', this.container);
        this.productImage = ensureElement<HTMLImageElement>('.card__image', this.container);

        if (actions?.onClick) {
            this.productOpenCardButton.addEventListener('click', actions.onClick);
        }
       
    }
    set category(category: string) {
        this.productCategory.textContent = category;
    }
    set imageLink(src: string) {
        this.productImage.src = CDN_URL + src;
    }
    set imageDescription(alt: string) {
        this.productImage.alt = alt;
    }
}

export class ProductPreview extends Product<IProduct> {
    productCategory: HTMLElement;
    productImage: HTMLImageElement;
    productDescription: HTMLElement;
    productAddRemoveButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);
        this.productCategory = ensureElement<HTMLElement>('.card__category', this.container);
        this.productImage = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.productDescription = ensureElement<HTMLElement>('.card__text', this.container);
        this.productAddRemoveButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this.productAddRemoveButton.addEventListener('click', () => {
            this.events.emit('cart: add / remove');
        })
        
    }
    set category(category: string) {
        this.productCategory.textContent = category;
    }
    set imageLink(src: string) {
        this.productImage.src = src;
    }
    set imageDescription(alt: string) {
        this.productImage.alt = alt;
    }
    set description(text: string) {
        this.productDescription.textContent = text;
    }
    set button(text: string) {
        this.productAddRemoveButton.textContent = text;        
    }
    deactivateButton() {
        this.productAddRemoveButton.disabled = true;
    }
    activateButton() {
        this.productAddRemoveButton.disabled = false;
    }
}

export class ProductCartView extends Product<IProduct> {
    productIndex: HTMLElement;
    productRemoveButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);
        this.productIndex = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.productRemoveButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        if (actions?.onClick) {
            this.productRemoveButton.addEventListener('click', actions.onClick);
        }
       
    }
    set index(index: number) {
        this.productIndex.textContent = String(index);
    }
}