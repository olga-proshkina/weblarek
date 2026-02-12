import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface IModal {
  content: HTMLElement;
}

export class ModalWindow extends Component<IModal> {
  modalCloseButton: HTMLButtonElement;
  contentModal: HTMLElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container);
    this.modalCloseButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container,
    );
    this.contentModal = ensureElement<HTMLElement>(
      ".modal__content",
      this.container,
    );

    this.modalCloseButton.addEventListener("click", () => {
      this.close();
    });

    this.contentModal.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    this.container.addEventListener("click", () => {
      this.close();
    });
  }

  set content(data: HTMLElement) {
    this.contentModal.replaceChildren(data);
  }

  show() {
    this.container.classList.add("modal_active");
  }

  close() {
    this.container.classList.remove("modal_active");
  }
}
