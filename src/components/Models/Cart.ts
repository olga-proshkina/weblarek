import { IProduct } from "../../types/index.js";
import { IEvents } from "../base/Events.js";

export class Cart {
  protected cartProducts: IProduct[];

  constructor(protected events: IEvents) {
    this.cartProducts = [];
  }

  // метод addToCart добавляет выбранный товар в корзину
  addToCart(product: IProduct) {
    this.cartProducts.push(product);
    this.events.emit('cart content change');
  }

  //метод removeFromCart удаляет выбранный товар из корзины
  removeFromCart(product: IProduct) {
    const itemToRemove = this.cartProducts.findIndex(
      (item) => item === product,
    );
    this.cartProducts.splice(itemToRemove, 1);
    this.events.emit('cart content change');
  }

  //метод getQuantity считает количество товаров в корзине
  getQuantity(): number {
    return this.cartProducts.length;
  }

  // метод getProductsFromCart возвращает массив с товарами в корзине
  getProductsFromCart(): IProduct[] {
    return this.cartProducts;
  }

  //метод calculateTotalPrice считает общую стоимость всех товаров в корзине
  calculateTotalPrice(): number {
    const total: number = this.cartProducts.reduce((totalPrice, item) => {
      totalPrice = totalPrice + (item.price ?? 0);
      return totalPrice;
    }, 0);
    return total;
  }

  // метод checkCart проверяет наличие товара в корзине
  checkCart(product: IProduct): boolean {
    const findItem = this.cartProducts.some((item) => item === product);
    return findItem;
  }
}
