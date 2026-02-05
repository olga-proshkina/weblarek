import { IProduct } from "../../types/index.js";
import { IEvents } from "../base/Events.js";

export class MainCatalog {
  protected products: IProduct[]; //массив всех товаров на главной странице
  protected selectedProduct: IProduct; //выбранный товар

  constructor(protected events: IEvents) {
    this.products = [];
    this.selectedProduct = {} as IProduct;
  }

  // метод getProducts позволяет получит массив всех товаров на главной странице
  getProducts(): IProduct[] {
    return this.products;
  }

  // метод setProducts сохраняет массив всех товаров на главной странице
  setProducts(items: IProduct[]) {
    this.products = items;
    this.events.emit('catalog changed');
  }

  // метод getSelectedProduct позволяет получить товар выбранный пользователем
  getSelectedProduct(): IProduct {
    return this.selectedProduct;
  }

  // метод setSelectedProduct сохраняет товар выбранный пльзователем
  setSelectedProduct(product: IProduct) {
    this.selectedProduct = product;
    this.events.emit('selected product changed');
  }
}
