import {
  PostOrderData,
  PostOrderDataResult,
  GetProduct,
} from "../../types/index.js";
import { Api } from "../base/Api.js";
import { API_URL } from "../../utils/constants.js";

const apiForWebLarek = new Api(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});

export class WebLarekApi {
  // метод getProducts получает с сервера данные о товарах и возвращает массив с данными
  async getProducts(): Promise<GetProduct> {
    const products: GetProduct = await apiForWebLarek.get(`/product/`);
    return products;
  }

  // метод postOrder отправляет на сервер данные заполненые покупателем и возвращает результат отправки
  async postOrder(data: PostOrderData): Promise<PostOrderDataResult> {
    const result: PostOrderDataResult = await apiForWebLarek.post(
      `/order`,
      data,
    );
    return result;
  }
}
