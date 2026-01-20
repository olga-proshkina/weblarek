import {
  PostOrderData,
  PostOrderDataResult,
  GetProduct,
} from "../../types/index.js";
import { Api } from "../base/Api.js";



export class WebLarekApi {
  protected api;
   constructor(api: Api) {
    this.api = api;
   }
  // метод getProducts получает с сервера данные о товарах и возвращает массив с данными
  async getProducts(): Promise<GetProduct> {
    const products = await this.api.get<GetProduct>(`/product/`);
    return products;
  }

  // метод postOrder отправляет на сервер данные заполненые покупателем и возвращает результат отправки
  async postOrder(data: PostOrderData): Promise<PostOrderDataResult> {
    const result = await this.api.post<PostOrderDataResult>(
      `/order`,
      data,
    );
    return result;
  }
}
