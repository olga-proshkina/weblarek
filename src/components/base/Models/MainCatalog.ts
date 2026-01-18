
import { IProduct } from '../../../types/index.js';

export class MainCatalog {

    protected products: IProduct[]; //массив всех товаров на главной странице
    protected selectedProduct: IProduct; //выбранный товар

    constructor(products: IProduct[], selectedProduct: IProduct) {
        this.products = products;
        this.selectedProduct = selectedProduct;
    }

    // метод getProducts позволяет получит массив всех товаров на главной странице
    getProducts(): IProduct[] {
        return this.products;
    }

    // метод setProducts сохраняет массив всех товаров на главной странице
    setProducts(items: IProduct[]) {
        this.products = items;

    }

    // метод getSelectedProduct позволяет получить товар выбранный пользователем
    getSelectedProduct(): IProduct {
        return this.selectedProduct;
    }

    // метод setSelectedProduct сохраняет товар выбранный пльзователем
    setSelectedProduct(product: IProduct) {
         this.selectedProduct = product;
    }
}
