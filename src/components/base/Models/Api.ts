/* Класс - получает данные о таворах с сервера и отправляет данные покупателя на сервер

class Api 

baseLink: string 

getData - получает данные с сервера  
возвращает массив с данными

postData - отправляет на сервер данные покупателя
*/

import {  postApi } from '../../../types/index.js';


export class Api {

    protected baseLink: string;

    constructor(baseLink: string) {
        this.baseLink = baseLink;
    }

    // метод getData получает с сервера данные о товарах и возвращает массив с данными
    async getData() {
        const response = await fetch(`${this.baseLink}/product/`);
        if (!response.ok) {
            throw new Error(`Ошибка получения данных с сервера: ${response.status} ${response.statusText}`);
        }
        return response.json();
    }

    // метод postData отправляет на сервер данные заполненые покупателем и возвращает результат отправки
    async postData(data: postApi) {
        const response = await fetch(`${this.baseLink}/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    
        if (!response.ok) {
            throw new Error(`Ошибка отправки данных на сервер: ${response.status} ${response.statusText}`)
        }
        return response.json();
    
    }
}

;